import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addClockItem, updateClockItem } from '../../../reducers/process/best-practice/best-practice.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const ClockItemForm = props => {
    const [clockItemInfo, setClockItemInfo] = useState({
        deptName: props.deptName,
        objectiveName: props.objectiveName,
        stepNumber: props.stepNumber,
        practice: '',
        method: '',
        purpose: ''
    });

    const { practice, method, purpose } = clockItemInfo;

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
        if (props.editMode) {
            if (clockItemInfo !== props.clockItemInput) {
                props.updateClockItem(clockItemInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addClockItem(clockItemInfo, props.callback);
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
                    Fill out the form below to add a Best Practice
                </h3>
                :
                <h3 className='centered'>
                    {props.clockItemInput.practice}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Practice'
                    type='text'
                    name='practice'
                    value={practice}
                    onChange={handleChange}
                />
                <FormInput
                    label='Method'
                    type='text'
                    name='method'
                    value={method}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Purpose'
                    type='text'
                    name='purpose'
                    value={purpose}
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