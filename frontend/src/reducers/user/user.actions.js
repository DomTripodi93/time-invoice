import UserActionTypes from './user.types';
import helpers from '../../shared/helpers';
import rootHttp from '../root-http';

const http = new rootHttp();
const helper = new helpers();

export const registerUser = (user, callback) => {
    user.name = helper.capitalize(user.name);

    http.addItem("auth/register", user).then(() => callback());
    return {
        type: UserActionTypes.REGISTER_USER
    }
};

export const signInUser = (user, callback) => {
    return dispatch => {
        http.addItem("auth/login", user)
            .then(response => {
                dispatch(setUserData(response.data, {}));
                callback();
            })
    }
};

export const setUserData = (user, settings) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('id', user.id);

    return {
        type: UserActionTypes.SIGNIN_USER,
        payload: user,
        settings
    };
};

export const signOutUser = (callback) => {
    localStorage.setItem('token', "");
    localStorage.setItem('id', "");
    callback();

    return {
        type: UserActionTypes.SIGNOUT_USER
    };
};

export const checkUser = (id, token) => {
    return dispatch => {
        http.fetchAll("settings")
            .then((settings) => {
                dispatch(
                    setUserData({
                        token,
                        id
                    }, settings.data)
                )
            })
            .catch(() => {
                dispatch(
                    signOutUser(() => { })
                )
            });
    }
}

export const updateSettings = (settingsForUpdate) => {
    return dispatch => {
        http.updateItemByUser("settings", settingsForUpdate)
            .then((settings) => {
                dispatch(
                    updateSettingsInState(settings.data)
                )
            })
    }
}

export const updateSettingsInState = (settings) => {
    return {
        type: UserActionTypes.UPDATE_SETTINGS,
        settings
    };
};

export const callTest = () => {
    http.fetchAll("test");
    return {
        type: UserActionTypes.REGISTER_USER
    }
}