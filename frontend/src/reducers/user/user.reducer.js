import UserActionTypes from './user.types';

const INITIAL_STATE = {
    userToken: null,
    userId: null,
    isAuthenticated: false,
    settings: {}
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGNIN_USER:
            return {
                ...state,
                userToken: action.payload.token,
                userId: action.payload.id,
                isAuthenticated: true,
                settings: action.settings
            };
        case UserActionTypes.UPDATE_SETTINGS:
            return {
                ...state,
                settings: action.settings
            };
        case UserActionTypes.SIGNOUT_USER:
            return {
                userToken: null,
                userId: null,
                isAuthenticated: false,
                settings: {}
            };
        default:
            return state;
    }
}

export default userReducer;