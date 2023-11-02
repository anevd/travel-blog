import { mainTypes } from "./actionTypes";
import axios from "axios";

export const getAboutDataAC = (data) => ({
	type: mainTypes.GET_ABOUT_DATA,
	payload: data,
});

export const getDogAC = (dog) => ({
	type: mainTypes.GET_DOG,
	payload: dog,
});

export const getCarouselDataAC = (data) => ({
	type: mainTypes.GET_CAROUSEL_DATA,
	payload: data,
});

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

export const getCountriesAC = (countries) => ({
	type: mainTypes.GET_COUNTRIES,
	payload: countries,
});

export const getCuisinesAC = (cuisines) => ({
	type: mainTypes.GET_CUISINES,
	payload: cuisines,
});

export const deleteCountryAC = (id) => ({
	type: mainTypes.DELETE_COUNTRY,
	payload: id,
});

export const addCountryAC = (country) => ({
	type: mainTypes.ADD_COUNTRY,
	payload: country,
});

export const editCountryAC = (country) => ({
	type: mainTypes.EDIT_COUNTRY,
	payload: country,
});

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

export const getPointsAC = (points) => ({
	type: mainTypes.GET_POINTS,
	payload: points,
});

export const getAboutDataThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/about").then((resp) => {
		dispatch(getAboutDataAC(resp.data));
	});
};

export const getDogThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/dog").then((resp) => {
		dispatch(getDogAC(resp.data));
	});
};

export const getCarouselDataThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/carousel").then((resp) => {
		dispatch(getCarouselDataAC(resp.data));
	});
};

export const getCollapseItemsThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/collapseItems").then((resp) => {
		dispatch(getCollapseItemsAC(resp.data));
	});
};

export const getCountriesThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/countries").then((resp) => {
		dispatch(getCountriesAC(resp.data));
	});
};

export const getCuisinesThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/cuisines").then((resp) => {
		dispatch(getCuisinesAC(resp.data));
	});
};

export const getPointsThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/points").then((resp) => {
		dispatch(getPointsAC(resp.data));
	});
};
