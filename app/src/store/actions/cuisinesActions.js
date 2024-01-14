import { mainTypes } from "./actionTypes";
import axios from "axios";

export const getCuisinesAC = (cuisines) => ({
	type: mainTypes.GET_CUISINES,
	payload: cuisines,
});

export const getCuisinesThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/cuisines").then((resp) => {
		dispatch(getCuisinesAC(resp.data));
	});
};
