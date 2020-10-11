import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchClockItemsByDate } from '../../reducers/process/best-practice/best-practice.actions';
import ClockItemNew from '../../components/process/best-practice/best-practice-new';
import ClockItems from '../../components/process/best-practice/best-practices';

import './process.styles.scss';
import { fetchClockItemsByDateAndInvoiced } from '../../reducers/clockItem/clock-item.actions';


const ClockItemContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchClockItems = props.fetchClockItems;
    const startDate = props.match.params.startDate;
    const endDate = props.match.params.endDate;

    useEffect(() => {
        if (startDate && endDate) {
            fetchClockItems(startDate, endDate);
        }
    }, [fetchClockItems, startDate, endDate]);


    const showClockItemForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Clock Times</h3>
            <div className="grid100">
                <ClockItemNew
                    addMode={addMode}
                    action={showClockItemForm} />
            </div>
            <br />
            {props.clockItems ?
                <ClockItems
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