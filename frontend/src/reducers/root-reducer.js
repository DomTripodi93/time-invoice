import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import clockItemReducer from './clock-item/clock-item.reducer';

export default combineReducers({
    user: userReducer,
    clockItem: clockItemReducer
})