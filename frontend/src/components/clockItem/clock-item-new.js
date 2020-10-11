import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ClockItemForm from './best-practice-form';

const ClockItemNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <ClockItemForm
                            callback={props.action}
                            editMode={false} />
                    </div>
                    <br />
                </div>
                :
                <div className='full-button'>
                    <div className='grid100'>
                        <CustomButton
                            buttonStyle="blue round"
                            label="Add Time"
                            action={props.action}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default ClockItemNew;