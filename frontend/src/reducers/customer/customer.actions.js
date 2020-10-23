import rootHttp from '../root-http';
import CustomerActionTypes from './customer.types';
import helpers from '../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();


export function fetchCustomers() {
    return dispatch => {
        http.fetchAll("customer")
            .then((customers) => {
                dispatch(setCustomers(customers));
            });
    }
}
//Gets all customers for a given date range

export function addCustomer(customer, callback) {
    customer = prepCustomerValues(customer);
    return dispatch => {
        http.addItem("customer", customer)
            .then(addedCustomer => {
                dispatch(addOrUpdateCustomerInState(addedCustomer.data));
                callback();
            });
    }
}
//Posts new customer to API

export function updateCustomer(customer, callback) {
    customer = prepCustomerValues(customer);
    return dispatch => {
        http.updateItemById("customer", customer, customer._id)
            .then((updatedCustomer) => {
                dispatch(addOrUpdateCustomerInState(updatedCustomer.data));
                callback();
            }
        );
    }
}
//Updates customer in database

export function deleteCustomer(id) {
    return dispatch => {
        http.deleteItemById("customer", id)
            .then(() => {
                dispatch(deleteCustomerFromState(id));
            }
        );
    }
}
//Deletes selected customer


export function addOrUpdateCustomerInState(customer) {
    return {
        type: CustomerActionTypes.ADD_OR_UPDATE_CUSTOMERS,
        payload: customer
    }
}
//Adds or Updates customer in state

export function setCustomers(customers) {
    return {
        type: CustomerActionTypes.SET_CUSTOMERS,
        payload: customers
    }
}
//Sets all customers in state

export function deleteCustomerFromState(id) {
    return {
        type: CustomerActionTypes.DELETE_CUSTOMER,
        payload: id
    }
}
//Deletes selected customer in state

function prepCustomerValues(customer) {
    customer.companyName = helper.capitalizeAll(customer.companyName);
    customer.pointOfContact = helper.capitalizeAll(customer.pointOfContact);
    customer.address = helper.capitalizeAll(customer.address);
    customer.state = helper.capitalizeAll(customer.state);
    return customer;
}

