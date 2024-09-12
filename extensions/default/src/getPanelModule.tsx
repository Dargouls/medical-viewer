import i18n from 'i18next';
import React from 'react';
import { PanelMeasurementTable, WrappedPanelStudyBrowser } from './Panels';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({ commandsManager, extensionManager, servicesManager }) {
	const wrappedMeasurementPanel = () => {
		return (
			<PanelMeasurementTable
				commandsManager={commandsManager}
				servicesManager={servicesManager}
				extensionManager={extensionManager}
			/>
		);
	};

	return [
		{
			name: 'seriesList',
			iconName: 'tab-studies',
			iconLabel: 'Studies',
			label: 'Estudo',
			component: WrappedPanelStudyBrowser.bind(null, {
				commandsManager,
				extensionManager,
				servicesManager,
			}),
		},
		{
			name: 'measurements',
			iconName: 'tab-linear',
			iconLabel: 'Measure',
			label: i18n.t('SidePanel:Measurements'),
			secondaryLabel: i18n.t('SidePanel:Measurements'),
			component: wrappedMeasurementPanel,
		},
	];
}

export default getPanelModule;
