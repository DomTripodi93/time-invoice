import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCustomers } from '../../reducers/customer/customer.actions';
import CustomerNew from '../../components/customer/customer-new';
import Customers from '../../components/customer/customers';

import "../customer/customer.styles.scss";


const CustomerContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchCustomers = props.fetchCustomers;

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);


    const showCustomerForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div className="size-holder middle">
            <h3 className='centered'>Customers</h3>
            <div className="grid100">
                <CustomerNew
                    addMode={addMode}
                    callback={showCustomerForm} />
            </div>
            <br />
            {props.customers ?
                <Customers
                    action={showCustomerForm}
                    customers={props.customers} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCustomers: () => dispatch(fetchCustomers())
    }
}

const mapStateToProps = state => ({
    customers: state.customer.customers
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);