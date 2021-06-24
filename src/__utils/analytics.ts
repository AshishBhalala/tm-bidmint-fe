/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const trackListener = (event: any, eventsHistory: any) => {
	const analytics = event.field.analytics;
	if (analytics && analytics.track && analytics.eventType === event.type) {
		const dataLayerObj: any = {};
		dataLayerObj.event = event.type;
		dataLayerObj.type = event.type;
		dataLayerObj.slide = event.slideCode;
		dataLayerObj.field = event.field.name;
		switch (analytics.eventType) {
			case 'blur':
				dataLayerObj.value = event.evt.target.value;
				break;
			case 'change':
				dataLayerObj.value = event.value;
				break;
			default:
				dataLayerObj.value =
					event.type === 'ON_CHANGE'
						? event.value
						: event.evt.target.value;
				break;
		}
		window.dataLayer.push(dataLayerObj);
	}
};

trackListener.eventType = ['ON_BLUR', 'ON_CHANGE'];

export default trackListener;
