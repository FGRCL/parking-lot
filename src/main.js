import { meet } from '@googleworkspace/meet-addons/meet.addons';

const config = {
	CLOUD_PROJECT_NUMBER: "",
	MAIN_STAGE_URL: "",
}

export async function setUpAddon() {
	const session = await meet.addon.createAddonSession({
		cloudProjectNumber: config.CLOUD_PROJECT_NUMBER,
	});
	const sidePanelClient = await session.createSidePanelClient();
	document
		.getElementById('start-activity')
		.addEventListener('click', async () => {
			await sidePanelClient.startActivity({
				mainStageUrl: config.MAIN_STAGE_URL
			});
		});
}

