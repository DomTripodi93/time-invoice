import React from 'react';
import Customer from './customer';

const Customers = props => {
    return (
        <div>
            {props.customers.length > 0 ?
                <div>
                    <div className='customer-grid grid-line'>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Company</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">POC</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Phone</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Email</h5>
                        </div>
                        <div className="inner-border-right-header">
                        </div>
                    </div>
                    <div className='grid100'>
                        {props.customers.map(customer => (
                            <div key={customer._id}>
                                <Customer
                                    action={props.showCustomerForm}
                                    customer={customer}
                                    customerGroups={props.customerGroups} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any customers!
                    </h4>
                    <h4 className="spaced">
                        Add some customers using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default Customers;