import React from 'react';
import Invoice from './invoice';

const Invoices = props => {
    return (
        <div>
            {Object.keys(props.invoices).length > 0 ?
                <div>
                    <div className='invoice-grid grid-line'>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Date</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Invoice</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Customer</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Range</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Hours</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Paid</h5>
                        </div>
                        <div className="inner-border-right-header">
                        </div>
                    </div>
                    <div className='grid100'>
                        {props.invoices.map(invoice => (
                            <div key={invoice._id}>
                                <Invoice
                                    action={props.showInvoiceForm}
                                    invoice={invoice} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any invoices!
                    </h4>
                    <h4 className="spaced">
                        Add some invoices using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default Invoices;