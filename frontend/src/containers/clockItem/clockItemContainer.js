import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchClockItemsByDate } from '../../reducers/process/best-practice/best-practice.actions';
import ClockItemNew from '../../components/process/best-practice/best-practice-new';
import ClockItems from '../../components/process/best-practice/best-practices';

import './process.styles.scss';


const ClockItemContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchClockItems = props.fetchClockItems;
    const deptName = props.deptName;
    const objectiveName = props.objectiveName;
    const stepNumber = props.stepNumber;

    useEffect(() => {
        if (stepNumber) {
            fetchClockItems(deptName, objectiveName, stepNumber);
        }
    }, [fetchClockItems, deptName, objectiveName, stepNumber]);


    const showClockItemForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Best Practices</h3>
            <div className="grid100">
                <ClockItemNew
                    deptName={deptName}
                    objectiveName={objectiveName}
                    stepNumber={stepNumber}
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
        fetchClockItems: (deptName, objectiveName, stepNumber) => dispatch(fetchClockItemsByDate(deptName, objectiveName, stepNumber))
    }
}

const mapStateToProps = state => ({
    clockItems: state.clockItem.clockItems
});

export default connect(mapStateToProps, mapDispatchToProps)(ClockItemContainer);