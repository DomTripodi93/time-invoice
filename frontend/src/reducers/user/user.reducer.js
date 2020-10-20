import UserActionTypes from './user.types';

const INITIAL_STATE = {
    userToken: null,
    userId: null,
    isAuthenticated: false,
    defaultEmail: null,
    defaultPointOfContact: null,
    lastInvoiceNumber: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGNIN_USER:
            return {
                ...state,
                userToken: action.payload.token,
                userId: action.payload.id,
                isAuthenticated: true,
                defaultEmail: action.payload.defaultEmail,
                defaultPointOfContact: action.payload.defaultPointOfContact,
                lastInvoiceNumber: action.payload.lastInvoiceNumber
            };
        case UserActionTypes.SIGNOUT_USER:
            return {
                userToken: null,
                userId: null,
                isAuthenticated: false,
                defaultEmail: null,
                defaultPointOfContact: null,
                lastInvoiceNumber: null
            };
        default:
            return state;
    }
}

export default userReducer;