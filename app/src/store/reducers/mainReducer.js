import { mainTypes } from "../actions/actionTypes";

const initialState = {
	dog: {},
	helloData: {},
	carouselData: [],
	collapseItems: [],
	countries: [],
	points: [],
	changesСollection: [],
};

export function mainReducer(state = initialState, action) {
	switch (action.type) {
		case mainTypes.GET_DOG: {
			const dog = action.payload;
			return { ...state, dog: dog };
		}
		case mainTypes.GET_ABOUT_DATA: {
			const data = action.payload;
			return { ...state, helloData: data };
		}
		case mainTypes.GET_CAROUSEL_DATA: {
			const data = action.payload;
			return { ...state, carouselData: data };
		}
		case mainTypes.GET_COLLAPSE_ITEMS: {
			const items = action.payload;
			return { ...state, collapseItems: items };
		}
		case mainTypes.ADD_VIDEO: {
			const newVideo = action.payload;
			return { ...state, collapseItems: [...state.collapseItems, newVideo] };
		}
		case mainTypes.DELETE_VIDEO: {
			const key = action.payload;
			return {
				...state,
				collapseItems: state.collapseItems.filter((el) => {
					return el.key !== key;
				}),
			};
		}
		case mainTypes.GET_COUNTRIES: {
			const countries = action.payload;
			return { ...state, countries };
		}
		case mainTypes.DELETE_COUNTRY: {
			const id = action.payload;
			return {
				...state,
				countries: state.countries.filter((el) => {
					return el.id !== id;
				}),
			};
		}

		case mainTypes.COLLECT_CHANGES: {
			const value = action.payload.value;
			const property = action.payload.property;
			const id = action.payload.id;
			console.log(value, property, id);
			return {
				...state,
			};
		}

		case mainTypes.GET_POINTS: {
			const points = action.payload;
			return { ...state, points };
		}
		default: {
			return state;
		}
	}
}
