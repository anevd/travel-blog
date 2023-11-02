import { mainTypes } from "../actions/actionTypes";

const initialState = {
	dog: {},
	helloData: {},
	carouselData: [],
	collapseItems: [],
	countries: [],
	cuisines: [],
	points: [],
	isModalOpen: false,
	modalIndex: null,
	modalAction: null,
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
			return { ...state, collapseItems: [newVideo, ...state.collapseItems] };
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
		case mainTypes.GET_CUISINES: {
			const cuisines = action.payload;
			return { ...state, cuisines };
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
		case mainTypes.ADD_COUNTRY: {
			const newCountry = action.payload;
			return {
				...state,
				countries: [newCountry, ...state.countries],
			};
		}
		case mainTypes.EDIT_COUNTRY: {
			const changedCountry = action.payload;
			const copy = state.countries;
			copy.map((el) => {
				if (el.id === changedCountry.id) {
					return {
						...el,
						attractions: changedCountry.attractions,
						hotels: changedCountry.hotels,
						restaurants: changedCountry.restaurants,
					};
				}
				return el;
			});
			return {
				...state,
				countries: copy,
			};
		}
		case mainTypes.CHANGE_MODAL_INDEX: {
			const index = action.payload;
			return { ...state, modalIndex: index, isModalOpen: true };
		}
		case mainTypes.CHANGE_MODAL_VISIBILITY: {
			const boolean = action.payload;
			return { ...state, isModalOpen: boolean };
		}
		case mainTypes.CHANGE_MODAL_ACTION: {
			const actionType = action.payload;
			return { ...state, modalAction: actionType };
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
