import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCustomerGroups, fetchCustomers } from '../../reducers/customer/customer.actions';
import CustomerNew from '../../components/customer/customer-new';
import Customers from '../../components/customer/customers';

import "../customer/customer.styles.scss";


const CustomerContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchCustomers = props.fetchCustomers;
    const fetchCustomerGroups = props.fetchCustomerGroups;

    useEffect(() => {
        fetchCustomers();
        fetchCustomerGroups();
    }, [fetchCustomers, fetchCustomerGroups]);


    const showCustomerForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div className="size-holder middle">
            <h3 className='centered'>Customers</h3>
            <div className="grid100">
                <CustomerNew
                    addMode={addMode}
                    callback={showCustomerForm}
                    customerGroups={props.customerGroups} />
            </div>
            <br />
            {props.customers ?
                <Customers
                    action={showCustomerForm}
                    customers={props.customers}
                    customerGroups={props.customerGroups} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCustomers: () => dispatch(fetchCustomers()),
        fetchCustomerGroups: () => dispatch(fetchCustomerGroups())
    }
}

const mapStateToProps = state => ({
    customers: state.customer.customers,
    customerGroups: state.customer.customerGroups
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);