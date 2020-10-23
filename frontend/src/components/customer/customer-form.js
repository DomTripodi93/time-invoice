import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { addCustomer, updateCustomer } from '../../reducers/customer/customer.actions';
import CustomButton from '../../shared/elements/button/custom-button.component';
import FormInput from '../../shared/elements/form-input/form-input.component';
import FormSelect from '../../shared/elements/form-select/form-select.component';


const CustomerForm = props => {
    const editMode = props.editMode;
    const customerInput = props.customerInput;
    const [customerInfo, setCustomerInfo] = useState({
        companyName: "",
        group: "",
        pointOfContact: "",
        address: "",
        state: "",
        zipCode: "",
        defaultPhone: "",
        defaultEmail: "",
        isGroup: false
    });

    const [groupOptions, setGroupOptions] = useState([{ value: null, label: "None" }])

    const isGroupOptions = [
        {
            value: true,
            label: "True"
        },
        {
            value: false,
            label: "False"
        }
    ];
    
    const setUpGroupOptions = useCallback(() => {
        if (props.editMode){
            props.customerGroups.forEach(group => {
                if (group.companyName != props.customerInput.companyName){
                    setGroupOptions((groups => { return [...groups, { 
                        value: group.companyName, label: group.companyName
                    }]}))
                }
            })
        } else {
            props.customerGroups.forEach(group => {
                setGroupOptions((groups => { return [...groups, { 
                    value: group.companyName, label: group.companyName
                }]}))
            })
        }
    },[props])

    useEffect(() => {
        if (editMode) {
            setCustomerInfo({
                ...customerInput
            });
        }
        setUpGroupOptions();
    }, [editMode, customerInput, setUpGroupOptions])


    const {
        companyName,
        group,
        pointOfContact,
        address,
        state,
        zipCode,
        defaultPhone,
        defaultEmail,
        isGroup
    } = customerInfo;

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (customerInfo !== props.customer) {
                props.updateCustomer(customerInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addCustomer(customerInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Customer
                </h3>
                :
                <h3 className='centered'>
                    {props.customerInput.companyName}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Company'
                    type='text'
                    name='companyName'
                    value={companyName}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label='Group'
                    name='group'
                    value={group}
                    options={groupOptions}
                    onChange={handleChange}
                />
                <FormInput
                    label='Point Of Contact'
                    type='text'
                    name='pointOfContact'
                    value={pointOfContact}
                    onChange={handleChange}
                />
                <FormInput
                    label='Address'
                    type='text'
                    name='address'
                    value={address}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='State'
                    type='text'
                    name='state'
                    value={state}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Zip Code'
                    type='text'
                    name='zipCode'
                    value={zipCode}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Phone Number'
                    type='text'
                    name='defaultPhone'
                    value={defaultPhone}
                    onChange={handleChange}
                />
                <FormInput
                    label='Email'
                    type='text'
                    name='defaultEmail'
                    value={defaultEmail}
                    onChange={handleChange}
                />
                <FormSelect
                    label='Is a Group'
                    name='isGroup'
                    value={isGroup}
                    options={isGroupOptions}
                    onChange={handleChange}
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
    addCustomer: (customer, dates, callback) => {
        dispatch(addCustomer(customer, dates, callback))
    },
    updateCustomer: (customer, callback) => {
        dispatch(updateCustomer(customer, callback))
    }
});

export default connect(null, mapDispatchToProps)(CustomerForm);