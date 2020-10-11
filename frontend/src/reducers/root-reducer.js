import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import clockItemReducer from './clockItem/clock-item.reducer';

export default combineReducers({
    user: userReducer,
    clockItem: clockItemReducer
})