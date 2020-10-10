import ClockItemActionTypes from './best-practice.types';

const INITIAL_STATE = {
    clockItems: [],
    clockItemsByDate: {}
}

const clockItemReducer = (state = INITIAL_STATE, action) => {
    let clockItemsHold = {...state.clockItemsByDate}
    switch (action.type) {
        case ClockItemActionTypes.SET_CLOCK_ITEMS:
            return {
                ...state,
                clockItems: action.payload.data
            };
        case ClockItemActionTypes.SET_CLOCK_ITEMS_BY_DATE:
            clockItemsHold[action.key] = action.payload;
            return {
                ...state,
                clockItemsByDate: clockItemsHold
            }

        case ClockItemActionTypes.ADD_CLOCK_ITEM:
            return {
                ...state,
                clockItems: [...state.clockItems, action.payload]
            };
        case ClockItemActionTypes.UPDATE_CLOCK_ITEMS:
            return {
                ...state,
                clockItems: [
                    action.payload,
                    ...state.clockItems
                        .filter((value) => {
                            return value._id !== action.payload._id
                        })]
                    .sort((first, second) => {
                        if (first._id > second._id) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                    )
            };
        case ClockItemActionTypes.DELETE_CLOCK_ITEM:
            return {
                ...state,
                clockItems: [...state.clockItems
                    .filter((value) => {
                        return value._id !== action.payload
                    })
                ]
            };
        case ClockItemActionTypes.SIGNOUT_USER:
            return {
                clockItems: [],
                clockItemsByDate: {}
            };
        default:
            return state;
    }
}

export default clockItemReducer;