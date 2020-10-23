import React, { useState } from 'react';
import CustomerForm from './customer-form';
import { deleteCustomer } from '../../reducers/customer/customer.actions';
import { connect } from 'react-redux';
import edit from '../../shared/assets/Edit.png';
import trash from '../../shared/assets/Trash.png';

const SingleCustomer = props => {
    const [editMode, updateEditMode] = useState(false);
    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this customer" + props.customer.companyName + "?" 
        )) {
            props.deleteCustomer(
                props.customer._id
            );
        }
    }

    return (
        <div className='centered'>
            {!editMode ?
                <div className='customer-grid grid-line'>
                    <div className="inner-border-left">
                        {props.customer.companyName ?
                            <h5 className="company-name">{props.customer.companyName}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.customer.pointOfContact ?
                            <h5>{props.customer.pointOfContact}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.customer.defaultPhone ?
                            <h5>{props.customer.defaultPhone}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.customer.defaultEmail ?
                            <h5>{props.customer.defaultEmail}</h5>
                            :
                            null
                        }
                    </div>
                    {!props.change ?
                        <div className="grid50 inner-border-right">
                            <img alt="edit" className="icon" src={edit} onClick={setEditMode}/>
                            <img alt="delete" className="icon" src={trash} onClick={handleDelete}/>
                        </div>
                        :
                        null
                    }
                </div>
                :
                <CustomerForm
                    editMode={true}
                    customerInput={props.customer}
                    callback={setEditMode}
                    customerGroups={props.customerGroups} />
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCustomer: (id) => dispatch(deleteCustomer(id))
    }
}

export default connect(null, mapDispatchToProps)(SingleCustomer);