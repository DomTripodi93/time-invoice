import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import clockItemReducer from './clock-item/clock-item.reducer';
import invoiceReducer from './invoice/invoice.reducer';

export default combineReducers({
    user: userReducer,
    clockItem: clockItemReducer,
    invoice: invoiceReducer
})