import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addClockItem, updateClockItem } from '../../reducers/clock-item/clock-item.actions';
import CustomButton from '../../shared/elements/button/custom-button.component';
import FormInput from '../../shared/elements/form-input/form-input.component';
import helpers from '../../shared/helpers';


const ClockItemForm = props => {
    const helper = new helpers();
    const [clockItemInfo, setClockItemInfo] = useState({
        startTime: helper.getCurrentTimeAndDate(),
        endTime: helper.getCurrentTimeAndDate(),
        customer: "",
        hours: 0,
        invoiced: false
    });

    const { startTime, endTime, customer } = clockItemInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.clockItemInput).forEach(key => {
                if (props.clockItemInput[key] !== null) {
                    setClockItemInfo({ [key]: props.clockItemInput[key] });
                }
            })
            setClockItemInfo(props.clockItemInput);
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        let clockItemToSubmit = {
            ...clockItemInfo, 
            hours: helper.getHoursDifference(
                clockItemInfo.startTime,
                clockItemInfo.endTime)
        }
        if (props.editMode) {
            if (clockItemInfo !== props.clockItemInput) {
                props.updateClockItem(clockItemToSubmit, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addClockItem(clockItemToSubmit, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setClockItemInfo({ ...clockItemInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Time
                </h3>
                :
                <h3 className='centered'>
                    {props.clockItemInput.customer} - {props.clockItemInput.startTime}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Start Time'
                    type='datetime-local'
                    name='startTime'
                    value={startTime}
                    onChange={handleChange}
                />
                <FormInput
                    label='End Time'
                    type='datetime-local'
                    name='endTime'
                    value={endTime}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Customer'
                    type='text'
                    name='customer'
                    value={customer}
                    onChange={handleChange}
                    required
                />
                <div className="grid50">
                    {!props.editMode ?
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Add"
                        />
                        :
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Update"
                        />
                    }
                    <CustomButton
                        buttonStyle="red"
                        action={props.callback}
                        label="Cancel"
                    />
                </div>
            </form>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addClockItem: (clockItem, callback) => {
        dispatch(addClockItem(clockItem, callback))
    },
    updateClockItem: (clockItem, callback) => {
        dispatch(updateClockItem(clockItem, callback))
    }
});

export default connect(null, mapDispatchToProps)(ClockItemForm);