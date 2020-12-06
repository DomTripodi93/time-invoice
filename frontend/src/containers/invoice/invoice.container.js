import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchInvoicesByDate } from '../../reducers/invoice/invoice.actions';
import InvoiceNew from '../../components/invoice/invoice-new';
import Invoices from '../../components/invoice/invoices';
import "./invoice.styles.scss";
import { fetchCustomers } from '../../reducers/customer/customer.actions';


const InvoiceContainer = (props) => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const [addMode, setAddMode] = useState(false);
    const fetchInvoices = props.fetchInvoicesByDate;
    const fetchCustomers = props.fetchCustomers;
    const [dateRange, setDateRange] = useState({
        startDate: new Date(thisYear, thisMonth-1, 1).toJSON().split('T')[0],
        endDate:  new Date(thisYear, thisMonth+1, 0).toJSON().split('T')[0]
    })
    const {startDate, endDate} = dateRange;

    useEffect(() => {
        if (startDate && endDate) {
            fetchInvoices(startDate, endDate);
        }
    }, [fetchInvoices, startDate, endDate]);

    useEffect(()=>{
        fetchCustomers();
    }, [fetchCustomers])

    const showInvoiceForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div className="size-holder middle">
            <h3 className='centered'>Invoices</h3>
            <div className="grid100">
                <InvoiceNew
                    addMode={addMode}
                    addFormCallback={showInvoiceForm}
                    dateRangeCallback={setDateRange}
                    startDate={startDate}
                    endDate={endDate}
                    customers={props.customers} />
            </div>
            <br />
            {props.invoices ?
                <Invoices
                    action={showInvoiceForm}
                    invoices={props.invoices}
                    customers={props.customers} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchInvoicesByDate: (startDate, endDate) => 
            dispatch(fetchInvoicesByDate(startDate, endDate)),
        fetchCustomers: () => dispatch(fetchCustomers())
    }
}

const mapStateToProps = state => ({
    invoices: state.invoice.invoices,
    customers: state.customer.customers
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);
