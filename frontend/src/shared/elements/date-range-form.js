import React, { useState } from 'react';
import CustomButton from './button/custom-button.component';


const DateRangeForm = props => {
    const [dateRange, setDateRange] = useState({
        startDate: props.startDate,
        endDate: props.endDate
    });

    const handleSubmit = async event => {
        event.preventDefault();
        props.callback(dateRange);
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setDateRange({ ...dateRange, [name]: value });
    };

    return (
        <div>
            <form className='grid100' onSubmit={handleSubmit}>
                <div className="grid50">
                    <input
                        className="month-input centered"
                        onChange={handleChange}
                        defaultValue={props.startDate}
                        id="month"
                        name="startDate"
                        type="date" />
                    <input
                        className="month-input centered"
                        onChange={handleChange}
                        defaultValue={props.endDate}
                        id="month"
                        name="endDate"
                        type="date" />
                </div>
                <CustomButton buttonStyle="blue" label="Change Date Range" />
            </form>
        </div>
    )
}

export default DateRangeForm;