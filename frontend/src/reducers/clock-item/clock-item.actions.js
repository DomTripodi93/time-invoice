import rootHttp from '../root-http';
import ClockItemActionTypes from './clock-item.types';
import helpers from '../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();


export function fetchClockItemsByDate(startDate, endDate) {
    return dispatch => {
        http.fetchAll("clockItem/byDateRange/" + startDate + "/" + endDate)
            .then((clockItems) => {
                dispatch(setClockItems(clockItems));
            });
    }
}
//Gets all clockItems for a given date range

export function fetchClockItemsByDateAndInvoiced(startDate, endDate, invoiced) {
    return dispatch => {
        http.fetchAll("clockItem/byDateRange/" + startDate + "/" + endDate + "/" + invoiced)
            .then((clockItems) => {
                dispatch(setClockItems(clockItems));
            });
    }
}
//Gets all clockItems for a given date range

export function addClockItem(clockItem, callback) {
    clockItem = prepClockItemValues(clockItem);
    return dispatch => {
        http.addItem("clockItem", clockItem)
            .then(addedClockItem => {
                dispatch(addOrUpdateClockItemInState(addedClockItem.data, addedClockItem.data.startTime.substring(0,10)));
                callback();
            });
    }
}
//Posts new clockItem to API

export function updateClockItem(clockItem, callback) {
    clockItem = prepClockItemValues(clockItem);
    return dispatch => {
        http.updateItemById("clockItem", clockItem, clockItem._id)
            .then((updatedClockItem) => {
                dispatch(addOrUpdateClockItemInState(updatedClockItem.data, updatedClockItem.data.startTime.substring(0,10)));
                callback();
            }
        );
    }
}
//Updates clockItem in database

export function deleteClockItem(id) {
    return dispatch => {
        http.deleteItemById("clockItem", id)
            .then(() => {
                dispatch(deleteClockItemFromState(id));
            }
        );
    }
}
//Deletes selected clockItem



export function addOrUpdateClockItemInState(clockItem, date) {
    return {
        type: ClockItemActionTypes.ADD_OR_UPDATE_CLOCK_ITEMS,
        payload: clockItem,
        date
    }
}
//Adds or Updates clockItem in state

export function setClockItems(clockItems) {
    return {
        type: ClockItemActionTypes.SET_CLOCK_ITEMS,
        payload: clockItems
    }
}
//Sets all clockItems in state

export function deleteClockItemFromState(id) {
    return {
        type: ClockItemActionTypes.DELETE_CLOCK_ITEM,
        payload: id
    }
}
//Deletes selected clockItem

function prepClockItemValues(clockItem) {
    clockItem.practice = helper.capitalizeAll(clockItem.customer);
    return clockItem;
}

