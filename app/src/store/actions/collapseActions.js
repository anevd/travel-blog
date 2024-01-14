import { mainTypes } from "./actionTypes";
import axios from "axios";

export const getCollapseItemsAC = (items) => ({
	type: mainTypes.GET_COLLAPSE_ITEMS,
	payload: items,
});

export const addVideoAC = (video) => ({
	type: mainTypes.ADD_VIDEO,
	payload: video,
});

export const deleteVideoAC = (key) => ({
	type: mainTypes.DELETE_VIDEO,
	payload: key,
});

export const getCollapseItemsThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/collapseItems").then((resp) => {
		dispatch(getCollapseItemsAC(resp.data));
	});
};

export const addCollapseItemsThunk = (newVideo) => async (dispatch) => {
	return await axios.post("http://localhost:4000/collapseItems", newVideo).then((resp) => {
		if (resp.status === 200) {
			dispatch(addVideoAC(newVideo));
			return resp;
		} else {
			throw new Error("error");
		}
	});
};

export const deleteCollapseItemThunk = (key) => async (dispatch) => {
	await axios.delete(`http://localhost:4000/collapseItems/${key}`).then((resp) => {
		dispatch(deleteVideoAC(key));
	});
};
