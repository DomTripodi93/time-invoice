import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import CustomerForm from './customer-form';


const CustomerNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <CustomerForm
                            callback={props.callback}
                            editMode={false} />
                    </div>
                    <br />
                </div>
                :
                <div className="size-holder middle grid70">
                    <div className='full-button'>
                        <CustomButton
                            buttonStyle="blue round"
                            label="Add Customer"
                            action={props.callback}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default CustomerNew;