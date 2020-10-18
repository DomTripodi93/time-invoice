import React, { useState } from 'react';
import InvoiceForm from './invoice-form';
import { deleteInvoice } from '../../reducers/invoice/invoice.actions';
import { connect } from 'react-redux';
import edit from '../../shared/assets/Edit.png';
import trash from '../../shared/assets/Trash.png';
import helpers from '../../shared/helpers';

const SingleInvoice = props => {
    const helper = new helpers()
    const [editMode, updateEditMode] = useState(false);
    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this invoice ?" 
        )) {
            props.deleteInvoice(
                props.invoice._id
            );
        }
    }

    return (
        <div className='centered'>
            {!editMode ?
                <div className='invoice-grid grid-line'>
                    <div className="inner-border-left">
                        <h5>{helper.dateForDisplayWithDOW(props.invoice.date)}</h5>
                    </div>
                    <div className="inner-border-left">
                        {props.invoice.invoiceNumber ?
                            <h5>{props.invoice.invoiceNumber}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.invoice.customer ?
                            <h5>{props.invoice.customer}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.invoice.endTime ?
                            <h5>{props.invoice.range}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-left">
                        {props.invoice.hours ?
                            <h5>{props.invoice.hours}</h5>
                            :
                            null
                        }
                    </div>
                    <div className="inner-border-right">
                        {props.invoice.paid ?
                            <h5>Yes</h5>
                            :
                            <h5>No</h5>
                        }
                    </div>
                    {!props.change ?
                        <div className="grid50 inner-border-right">
                            <img className="icon middle" src={edit} onClick={setEditMode}/>
                            <img className="icon middle" src={trash} onClick={handleDelete}/>
                        </div>
                        :
                        null
                    }
                </div>
                :
                <InvoiceForm
                    editMode={true}
                    invoiceInput={props.invoice}
                    callback={setEditMode} />
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteInvoice: (id) => dispatch(deleteInvoice(id))
    }
}

export default connect(null, mapDispatchToProps)(SingleInvoice);