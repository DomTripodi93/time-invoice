import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import InvoiceForm from './invoice-form';
import DateRangeForm from '../../shared/elements/date-range-form';


const InvoiceNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <InvoiceForm
                            callback={props.addFormCallback}
                            editMode={false}
                            customers={props.customers} />
                    </div>
                    <br />
                </div>
                :
                <div className="size-holder middle grid70">
                    <div className='full-button'>
                        <CustomButton
                            buttonStyle="blue round"
                            label="Add Invoice"
                            action={props.addFormCallback}
                        />
                    </div>
                    <div className="grid100 date-form">
                        <DateRangeForm 
                            startDate={props.startDate}
                            endDate={props.endDate}
                            callback={props.dateRangeCallback} />
                    </div>
                </div>
            }
        </div>
    )
}

export default InvoiceNew;