import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import ClockItemForm from './clock-item-form';
import DateRangeForm from './date-range-form';

import "./clock-items.styles.scss";

const ClockItemNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        <ClockItemForm
                            callback={props.addFormCallback}
                            editMode={false} />
                    </div>
                    <br />
                </div>
                :
                <div className="size-holder middle grid70">
                    <div className='full-button'>
                        <CustomButton
                            buttonStyle="blue round"
                            label="Add Time"
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

export default ClockItemNew;