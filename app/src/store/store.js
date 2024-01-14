import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { aboutReducer } from "./reducers/aboutReducer";
import { collapseReducer } from "./reducers/collapseReducer";
import { countriesReducer } from "./reducers/countriesReducer";
import { cuisinesReducer } from "./reducers/cuisinesReducer";
import { dogReducer } from "./reducers/dogReducer";
import { mapReducer } from "./reducers/mapReducer";
import { modalReducer } from "./reducers/modalReducer";

const reducer = combineReducers({
	aboutStore: aboutReducer,
	collapseStore: collapseReducer,
	countriesStore: countriesReducer,
	cuisinesStore: cuisinesReducer,
	dogStore: dogReducer,
	mapStore: mapReducer,
	modalStore: modalReducer,
});

const store = configureStore({
	reducer: reducer,
});

export default store;
