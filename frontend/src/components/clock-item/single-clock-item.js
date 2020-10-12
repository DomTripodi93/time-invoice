import React, { useState } from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import ClockItemForm from './clock-item-form';
import { deleteClockItem } from '../../reducers/clock-item/clock-item.actions';
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
                    <div className='times-grid'>
                        <div className="inner-border-left-header">
                            {props.clockItem.customer ?
                                <h4>{props.clockItem.customer}</h4>
                                :
                                null
                            }
                        </div>
                        <div className="inner-border-left-header">
                            {props.clockItem.startTime ?
                                <h4>{props.clockItem.startTime.split("T")[1].substring(0,5)}</h4>
                                :
                                null
                            }
                        </div>
                        <div className="inner-border-left-header">
                            {props.clockItem.endTime ?
                                <h4>{props.clockItem.endTime.split("T")[1].substring(0,5)}</h4>
                                :
                                null
                            }
                        </div>
                        <div className="inner-border-left-header">
                            {props.clockItem.hours ?
                                <h4>{props.clockItem.hours}</h4>
                                :
                                null
                            }
                        </div>
                        <div className="inner-border-right-header">
                            {props.clockItem.invoiced ?
                                <h4>Yes</h4>
                                :
                                <h4>No</h4>
                            }
                        </div>
                        {!props.change ?
                            <div className="grid100 inner-border-right-header">
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