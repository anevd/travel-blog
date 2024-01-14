import { mainTypes } from "./actionTypes";

export const changeModalIndexAC = (index) => ({
	type: mainTypes.CHANGE_MODAL_INDEX,
	payload: index,
});

export const changeModalVisibilityAC = (boolean) => ({
	type: mainTypes.CHANGE_MODAL_VISIBILITY,
	payload: boolean,
});

export const changeModalActionAC = (action) => ({
	type: mainTypes.CHANGE_MODAL_ACTION,
	payload: action,
});
