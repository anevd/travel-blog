import { mainTypes } from "./actionTypes";
import axios from "axios";

export const getCountriesAC = (countries) => ({
	type: mainTypes.GET_COUNTRIES,
	payload: countries,
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

export const getCountriesThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/countries").then((resp) => {
		dispatch(getCountriesAC(resp.data));
	});
};

export const addCountryThunk = (choosenCountry) => async (dispatch) => {
	return await axios.post("http://localhost:4000/countries", choosenCountry).then((resp) => {
		if (resp.status === 200) {
			dispatch(addCountryAC(choosenCountry));
			return resp;
		} else {
			throw new Error("error");
		}
	});
};

export const editCountryThunk = (choosenCountry) => async (dispatch) => {
	return await axios.put("http://localhost:4000/countries", choosenCountry).then((resp) => {
		if (resp.status === 200) {
			dispatch(editCountryAC(choosenCountry));
			return resp;
		} else {
			throw new Error("error");
		}
	});
};

export const deleteCountryThunk = (id) => async (dispatch) => {
	return await axios.delete(`http://localhost:4000/countries/${id}`).then((resp) => {
		if (resp.status === 200) {
			dispatch(deleteCountryAC(id));
			return resp;
		} else {
			throw new Error("error");
		}
	});
};
