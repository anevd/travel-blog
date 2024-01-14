import { mainTypes } from "./actionTypes";
import axios from "axios";

export const getPointsAC = (points) => ({
	type: mainTypes.GET_POINTS,
	payload: points,
});

export const getPointsThunk = () => async (dispatch) => {
	await axios.get("http://localhost:4000/points").then((resp) => {
		dispatch(getPointsAC(resp.data));
	});
};
