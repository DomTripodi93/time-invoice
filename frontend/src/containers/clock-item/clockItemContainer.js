import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchClockItemsByDate } from '../../reducers/clock-item/clock-item.actions';
import ClockItemNew from '../../components/clock-item/clock-item-new';

import { fetchClockItemsByDateAndInvoiced } from '../../reducers/clock-item/clock-item.actions';
import ClockItemDates from '../../components/clock-item/clock-item-dates';

const ClockItemContainer = (props) => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const [addMode, setAddMode] = useState(false);
    const fetchClockItems = props.fetchClockItems;
    const [dateRange, setDateRange] = useState({
        startDate: new Date(thisYear, thisMonth, 1).toJSON().split('T')[0],
        endDate:  new Date(thisYear, thisMonth+1, 0).toJSON().split('T')[0]
    })
    const {startDate, endDate} = dateRange;

    useEffect(() => {
        console.log(startDate)
        if (startDate && endDate) {
            fetchClockItems(startDate, endDate);
        }
    }, [fetchClockItems, startDate, endDate]);


    const showClockItemForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div className="size-holder middle">
            <h3 className='centered'>Clock Times</h3>
            <div className="grid100">
                <ClockItemNew
                    addMode={addMode}
                    addFormCallback={showClockItemForm}
                    dateRangeCallback={setDateRange}
                    startDate={startDate}
                    endDate={endDate} />
            </div>
            <br />
            {props.clockItems ?
                <ClockItemDates
                    action={showClockItemForm}
                    clockItems={props.clockItems} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchClockItems: (startDate, endDate) => dispatch(fetchClockItemsByDate(startDate, endDate)),
        fetchClockItemsInvoiced: (startDate, endDate, invoiced) => 
            dispatch(fetchClockItemsByDateAndInvoiced(startDate, endDate, invoiced))
    }
}

const mapStateToProps = state => ({
    clockItems: state.clockItem.clockItems
});

export default connect(mapStateToProps, mapDispatchToProps)(ClockItemContainer);