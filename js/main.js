import { meet } from '@googleworkspace/meet-addons/meet.addons';
import { config } from './config';

export async function setUpAddon() {
	const session = await meet.addon.createAddonSession({
		cloudProjectNumber: config.CLOUD_PROJECT_NUMBER,
	});
	const sidePanelClient = await session.createSidePanelClient();
	document
		.getElementById('start-activity')
		.addEventListener('click', async () => {
			await sidePanelClient.startActivity({
				// mainStageUrl: config.MAIN_STAGE_URL
			});
		});
}

