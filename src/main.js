import { meet } from '@googleworkspace/meet-addons/meet.addons';
import config from './config';

const CLOUD_PROJECT_NUMBER = 'CLOUD_PROJECT_NUMBER';
const MAIN_STAGE_URL = 'MAIN_STAGE_URL';

export async function setUpAddon() {
	const session = await meet.addon.createAddonSession({
		cloudProjectNumber: CLOUD_PROJECT_NUMBER,
	});
	const sidePanelClient = await session.createSidePanelClient();
	document
		.getElementById('start-activity')
		.addEventListener('click', async () => {
			await sidePanelClient.startActivity({
				mainStageUrl: MAIN_STAGE_URL
			});
		});
}

