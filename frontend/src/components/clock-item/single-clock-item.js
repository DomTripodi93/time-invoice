import React, { useState } from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import ClockItemForm from './clock-item-form';
import { deleteClockItem } from '../../reducers/clock-item/clock-item.actions';
import { connect } from 'react-redux';
import edit from '../../shared/assets/Edit.png';
import trash from '../../shared/assets/Trash.png';

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
        <div className='border-practice centered'>
            {!editMode ?
                <div className='times-grid'>
                    <div className="inner-border-left">
                        {props.clockItem.customer ?
                            <h4>{props.clockItem.customer}</h4>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.startTime ?
                            <h4>{props.clockItem.startTime.split("T")[1].substring(0,5)}</h4>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.endTime ?
                            <h4>{props.clockItem.endTime.split("T")[1].substring(0,5)}</h4>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.hours ?
                            <h4>{props.clockItem.hours}</h4>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-right">
                        {props.clockItem.invoiced ?
                            <h4>Yes</h4>
                            :
                            <h4>No</h4>
                        }
                    </div>
                    {!props.change ?
                        <div className="grid50 inner-border-right">
                            <img className="icon middle" src={edit} onClick={setEditMode}/>
                            <img className="icon middle" src={trash} onClick={handleDelete}/>
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
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteClockItem: (practice, objectiveName, deptName) => dispatch(deleteClockItem(practice, objectiveName, deptName))
    }
}

export default connect(null, mapDispatchToProps)(SingleClockItem);