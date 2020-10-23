import CustomerActionTypes from './customer.types';

const INITIAL_STATE = {
    customers: []
}

const customerReducer = (state = INITIAL_STATE, action) => {
    let customersHold = [...state.customers]
    switch (action.type) {
        case CustomerActionTypes.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload.data
            };
        case CustomerActionTypes.ADD_OR_UPDATE_CUSTOMERS:
            customersHold = [
                action.payload,
                ...customersHold
                    .filter((value) => {
                        return value._id !== action.payload._id
                    })]
                .sort((first, second) => {
                    if (first.companyName < second.companyName) {
                        return -1
                    } else {
                        return 1
                    }
                })
            return {
                ...state,
                customers: customersHold
            };
        case CustomerActionTypes.DELETE_CUSTOMER:
            customersHold = [
                ...customersHold
                    .filter((value) => {
                        return value._id !== action.payload
                    })]
            return {
                ...state,
                customers: customersHold
            };
        case CustomerActionTypes.SIGNOUT_USER:
            return {
                customers: []
            };
        default:
            return state;
    }
}

export default customerReducer;