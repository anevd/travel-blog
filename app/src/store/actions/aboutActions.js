import { mainTypes } from "./actionTypes";
import axios from "axios";

export const getAboutDataAC = (data) => ({
	type: mainTypes.GET_ABOUT_DATA,
	payload: data,
});

export const getCarouselDataAC = (data) => ({
	type: mainTypes.GET_CAROUSEL_DATA,
	payload: data,
});

export const getAboutDataThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/about").then((resp) => {
		dispatch(getAboutDataAC(resp.data));
	});
};

export const getCarouselDataThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/carousel").then((resp) => {
		dispatch(getCarouselDataAC(resp.data));
	});
};
