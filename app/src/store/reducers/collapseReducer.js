import { mainTypes } from "../actions/actionTypes";

const initialState = {
	collapseItems: [],
};

export function collapseReducer(state = initialState, action) {
	switch (action.type) {
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
		default: {
			return state;
		}
	}
}
