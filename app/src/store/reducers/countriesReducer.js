import { mainTypes } from "../actions/actionTypes";

const initialState = {
	countries: [],
};

export function countriesReducer(state = initialState, action) {
	switch (action.type) {
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
		default: {
			return state;
		}
	}
}
