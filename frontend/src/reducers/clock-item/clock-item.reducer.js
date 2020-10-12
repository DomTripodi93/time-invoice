import ClockItemActionTypes from './clock-item.types';

const INITIAL_STATE = {
    clockItems: {}
}

const clockItemReducer = (state = INITIAL_STATE, action) => {
    let clockItemsHold = {...state.clockItems}
    switch (action.type) {
        case ClockItemActionTypes.SET_CLOCK_ITEMS:
            return {
                ...state,
                clockItems: action.payload.data
            };
        case ClockItemActionTypes.ADD_OR_UPDATE_CLOCK_ITEMS:
            if (clockItemsHold[action.date]){
                clockItemsHold[action.date] = [
                    action.payload,
                    ...clockItemsHold[action.date]
                        .filter((value) => {
                            return value._id !== action.payload._id
                        })]
                    .sort((first, second) => {
                        if (first.startTime < second.startTime) {
                            return 1
                        } else {
                            return -1
                        }
                    })
            }
            return {
                ...state,
                clockItems: clockItemsHold
            };
        case ClockItemActionTypes.DELETE_CLOCK_ITEM:
            clockItemsHold[action.date] = [
                ...clockItemsHold[action.date]
                    .filter((value) => {
                        return value._id !== action.payload._id
                    })]
            return {
                ...state,
                clockItems: clockItemsHold
            };
        case ClockItemActionTypes.SIGNOUT_USER:
            return {
                clockItems: {}
            };
        default:
            return state;
    }
}

export default clockItemReducer;