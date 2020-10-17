import InvoiceActionTypes from './invoice.types';

const INITIAL_STATE = {
    invoices: []
}

const invoiceReducer = (state = INITIAL_STATE, action) => {
    let invoicesHold = [...state.invoices]
    switch (action.type) {
        case InvoiceActionTypes.SET_INVOICES:
            return {
                ...state,
                invoices: action.payload.data
            };
        case InvoiceActionTypes.ADD_OR_UPDATE_INVOICES:
            if (invoicesHold[action.date]){
                invoicesHold[action.date] = [
                    action.payload,
                    ...invoicesHold
                        .filter((value) => {
                            return value._id !== action.payload._id
                        })]
                    .sort((first, second) => {
                        if (first.startTime < second.startTime) {
                            return -1
                        } else {
                            return 1
                        }
                    })
            }
            return {
                ...state,
                invoices: invoicesHold
            };
        case InvoiceActionTypes.DELETE_INVOICE:
            invoicesHold[action.date] = [
                ...invoicesHold
                    .filter((value) => {
                        return value._id !== action.payload
                    })]
            return {
                ...state,
                invoices: invoicesHold
            };
        case InvoiceActionTypes.SIGNOUT_USER:
            return {
                invoices: {}
            };
        default:
            return state;
    }
}

export default invoiceReducer;