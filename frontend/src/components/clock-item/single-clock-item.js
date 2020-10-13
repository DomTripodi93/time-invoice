import React, { useState } from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import ClockItemForm from './clock-item-form';
import { deleteClockItem } from '../../reducers/clock-item/clock-item.actions';
import { connect } from 'react-redux';
import edit from '../../shared/assets/Edit.png';
import trash from '../../shared/assets/Trash.png';
import helpers from '../../shared/helpers';

const SingleClockItem = props => {
    const helper = new helpers()
    const [editMode, updateEditMode] = useState(false);

    const date = helper.dateForDisplayWithDOW(props.date);

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
                        <h5>{date}</h5>
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.customer ?
                            <h5>{props.clockItem.customer}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.startTime ?
                            <h5>{helper.timeForDisplay(helper.timeFromDate(props.clockItem.startTime))}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.endTime ?
                            <h5>{helper.timeForDisplay(helper.timeFromDate(props.clockItem.endTime))}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.clockItem.hours ?
                            <h5>{props.clockItem.hours}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-right">
                        {props.clockItem.invoiced ?
                            <h5>Yes</h5>
                            :
                            <h5>No</h5>
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