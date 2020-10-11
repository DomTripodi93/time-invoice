import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ClockItemForm from './clock-item-form';
import { deleteClockItem } from '../../../reducers/process/best-practice/best-practice.actions';
import { connect } from 'react-redux';

const SingleClockItem = props => {
    const [editMode, updateEditMode] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this clockItem: " +
            props.clockItem.practice + ": " +
            props.clockItem.name + "?"
        )) {
            props.deleteClockItem(
                props.clockItem._id
            );
        }
    }

    return (
        <div>
            <div className='border-practice centered'>
                {!editMode ?
                    <div>
                        <h3>
                            {props.clockItem.customer ?
                                <h4>Customer: <br /> {props.clockItem.customer}</h4>
                                :
                                null
                            }
                        </h3>
                        {props.clockItem.startTime ?
                            <h4>Start Time: <br /> {props.clockItem.startTime}</h4>
                            :
                            null
                        }
                        {props.clockItem.endTime ?
                            <h4>End Time: <br /> {props.clockItem.endTime}</h4>
                            :
                            null
                        }
                        {props.clockItem.hours ?
                            <h4>Hours: <br /> {props.clockItem.hours}</h4>
                            :
                            null
                        }
                        {props.clockItem.invoiced ?
                            <h4>Invoiced:  Yes</h4>
                            :
                            <h4>Invoiced:  No</h4>
                        }
                        {!props.change ?
                            <div className="grid50">
                                <CustomButton
                                    action={setEditMode}
                                    buttonStyle="blue"
                                    label="Edit" />
                                <CustomButton
                                    action={handleDelete}
                                    buttonStyle="red"
                                    label="Delete" />
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    <ClockItemForm
                        editMode={true}
                        clockItemInput={props.clockItem}
                        callback={setEditMode} />
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteClockItem: (practice, objectiveName, deptName) => dispatch(deleteClockItem(practice, objectiveName, deptName))
    }
}

export default connect(null, mapDispatchToProps)(SingleClockItem);