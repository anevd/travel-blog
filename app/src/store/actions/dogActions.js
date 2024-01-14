import { mainTypes } from "./actionTypes";
import axios from "axios";

export const getDogAC = (dog) => ({
	type: mainTypes.GET_DOG,
	payload: dog,
});

export const getDogThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/dog").then((resp) => {
		dispatch(getDogAC(resp.data));
	});
};
