import rootHttp from '../root-http';
import InvoiceActionTypes from './invoice.types';
import helpers from '../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();


export function fetchAllInvoices() {
    return dispatch => {
        http.fetchAll("invoice/")
            .then((invoices) => {
                dispatch(setInvoices(invoices));
            });
    }
}
//Gets all invoices for a given date range

export function fetchInvoicesByDate(startDate, endDate) {
    return dispatch => {
        http.fetchAll("invoice/byDateRange/" + startDate + "/" + endDate)
            .then((invoices) => {
                dispatch(setInvoices(invoices));
            });
    }
}
//Gets all invoices for a given date range


export function addInvoice(invoice, callback) {
    invoice = prepInvoiceValues(invoice);
    return dispatch => {
        http.addItem("invoice", invoice)
            .then(addedInvoice => {
                dispatch(addOrUpdateInvoiceInState(addedInvoice.data, addedInvoice.data.startTime.substring(0,10)));
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
                dispatch(addOrUpdateInvoiceInState(updatedInvoice.data, updatedInvoice.data.startTime.substring(0,10)));
                callback();
            }
        );
    }
}
//Updates invoice in database

export function deleteInvoice(id, date) {
    return dispatch => {
        http.deleteItemById("invoice", id)
            .then(() => {
                dispatch(deleteInvoiceFromState(id, date));
            }
        );
    }
}
//Deletes selected invoice



export function addOrUpdateInvoiceInState(invoice, date) {
    return {
        type: InvoiceActionTypes.ADD_OR_UPDATE_INVOICES,
        payload: invoice,
        date
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

export function deleteInvoiceFromState(id, date) {
    return {
        type: InvoiceActionTypes.DELETE_INVOICE,
        payload: id,
        date
    }
}
//Deletes selected invoice in state

function prepInvoiceValues(invoice) {
    invoice.practice = helper.capitalizeAll(invoice.customer);
    return invoice;
}

