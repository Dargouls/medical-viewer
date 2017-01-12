import { BaseCriteria } from './BaseCriteria';
import { _ } from 'meteor/underscore';

/*
 * ModalityCriteria
 * Check if a modality is allowed or restricted
 * Options:
 *   method (string): allow, restrict
 *   modalities (string[]): list of allowed/restricted modalities
 */
export class ModalityCriteria extends BaseCriteria {

    constructor(options) {
        super();
        this.options = options;
    }

    check(data) {
        const measurementTypesIds = this.options.measurementTypesIds || ['targets'];
        const modalitiesSet = new Set(this.options.modalities);
        const validationMethod = this.options.method;
        const measurements = [];
        const invalidModalities = [];
        let message;

        measurementTypesIds.forEach(measurementTypesId => {
            const items = data[measurementTypesId];

            items.forEach(item => {
                const measurement = item.measurement;
                const metadata = item.metadata;
                const modality = metadata.modality.toUpperCase();

                if (((validationMethod === 'allow') && !modalitiesSet.has(modality)) || 
                    ((validationMethod === 'restrict') && modalitiesSet.has(modality))) {
                    measurements.push(measurement);
                    invalidModalities.push(modality);
                }
            });
        });

        if (measurements.length) {
            const uniqueModalities = _.uniq(invalidModalities);
            const uniqueModalitiesText = uniqueModalities.join(', ');
            const modalityText = uniqueModalities.length > 1 ? 'modalities' : 'modality';

            message = `The ${modalityText} ${uniqueModalitiesText} should not be used as a method of measurement`;
        }

        return this.respond(message, measurements);
    }

};
