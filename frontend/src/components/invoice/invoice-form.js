import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addInvoice, updateInvoice } from '../../reducers/invoice/invoice.actions';
import { updateSettings } from '../../reducers/user/user.actions';
import CustomButton from '../../shared/elements/button/custom-button.component';
import FormInput from '../../shared/elements/form-input/form-input.component';
import helpers from '../../shared/helpers';


const InvoiceForm = props => {
    const helper = new helpers();
    const [invoiceInfo, setInvoiceInfo] = useState({
        invoiceNumber: props.invoiceNumber,
        date: helper.getCurrentDate(),
        customer: "",
        hours: 0,
        paid: false,
        dateRange: ""
    });

    const [dateRage, setDateRange] = useState({
        startDate: helper.getCurrentDate(),
        endDate: helper.getCurrentDate()
    })

    useEffect(() => {
        if (props.editMode) {
            setInvoiceInfo({
                ...props.invoiceInput,
                date: props.invoiceInput.date.split('T')[0],
                startTime: helper.timeFromDate(props.invoiceInput.startTime),
                endTime: helper.timeFromDate(props.invoiceInput.endTime)
            });
        }
    }, [props, helper])

    const { date, customer } = invoiceInfo;
    const { startDate, endDate } = dateRage;

    const handleSubmit = async event => {
        let invoice = {...invoiceInfo};
        invoice.dateRange = helper.shortDate(dateRage.startDate) + " thru " + helper.shortDate(dateRage.endDate);
        event.preventDefault();
        if (props.editMode) {
            if (invoice !== props.invoice) {
                props.updateInvoice(invoice, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addInvoice(invoice, dateRage, props.callback);
            props.updateSettings({lastInvoiceNumber: props.invoiceNumber})
        }
    };

    const handleInvoiceChange = event => {
        const { name, value } = event.target;

        setInvoiceInfo({ ...invoiceInfo, [name]: value });
    };

    const handleDateRangeChange = event => {
        const { name, value } = event.target;

        setDateRange({ ...dateRage, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add an Invoice
                </h3>
                :
                <h3 className='centered'>
                    {props.invoiceInput.customer} - {helper.dateForDisplay(props.invoiceInput.startTime)}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Invoice Date'
                    type='date'
                    name='date'
                    value={date}
                    onChange={handleInvoiceChange}
                />
                <FormInput
                    label='Start Date'
                    type='date'
                    name='startDate'
                    value={startDate}
                    onChange={handleDateRangeChange}
                />
                <FormInput
                    label='End Date'
                    type='date'
                    name='endDate'
                    value={endDate}
                    onChange={handleDateRangeChange}
                    required
                />
                <FormInput
                    label='Customer'
                    type='text'
                    name='customer'
                    value={customer}
                    onChange={handleInvoiceChange}
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
    addInvoice: (invoice, dates, callback) => {
        dispatch(addInvoice(invoice, dates, callback))
    },
    updateInvoice: (invoice, callback) => {
        dispatch(updateInvoice(invoice, callback))
    },
    updateSettings: (settings) => {
        dispatch(updateSettings(settings))
    }
});

const mapStateToProps = state => ({
    invoiceNumber: state.user.settings.lastInvoiceNumber + 1
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);