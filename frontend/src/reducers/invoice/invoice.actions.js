import InvoiceActionTypes from './invoice.types';
import helpers from '../../shared/helpers';
import rootHttp from '../root-http';


const http = new rootHttp();
const helper = new helpers();


export function fetchInvoicesByDate(startDate, endDate) {
    return dispatch => {
        http.fetchAll("invoice/byDateRange/" + startDate + "/" + endDate)
            .then((invoices) => {
                dispatch(setInvoices(invoices));
            });
    }
}
//Gets all invoices for a given date range

export function addInvoice(invoice, dates, callback) {
    invoice = prepInvoiceValues(invoice);
    return dispatch => {
        http.addItem("invoice/" + dates.startDate + "/" + dates.endDate, invoice)
            .then(addedInvoice => {
                dispatch(addOrUpdateInvoiceInState(
                    addedInvoice.data
                ));
                callback();
            });
    }
}
//Posts new invoice to API

export function updateInvoice(invoice, callback) {
    invoice = prepInvoiceValues(invoice);
    return dispatch => {
        http.updateItemById("invoice", invoice, invoice._id)
            .then((updatedInvoice) => {
                dispatch(addOrUpdateInvoiceInState(updatedInvoice.data));
                callback();
            }
        );
    }
}
//Updates invoice in database

export function deleteInvoice(id) {
    return dispatch => {
        http.deleteItemById("invoice", id)
            .then(() => {
                dispatch(deleteInvoiceFromState(id));
            }
        );
    }
}
//Deletes selected invoice



export function addOrUpdateInvoiceInState(invoice) {
    return {
        type: InvoiceActionTypes.ADD_OR_UPDATE_INVOICES,
        payload: invoice
    }
}
//Adds or Updates invoice in state

export function setInvoices(invoices) {
    return {
        type: InvoiceActionTypes.SET_INVOICES,
        payload: invoices
    }
}
//Sets all invoices in state

export function deleteInvoiceFromState(id) {
    return {
        type: InvoiceActionTypes.DELETE_INVOICE,
        payload: id
    }
}
//Deletes selected invoice in state

function prepInvoiceValues(invoice) {
    invoice.practice = helper.capitalizeAll(invoice.customer);
    return invoice;
}

