import React from 'react';
import SingleClockItem from './single-clock-item';

const ClockItems = props => {
    return (
        <div className='grid100'>
            {props.clockItems.map(clockItem => (
                <div
                    key={clockItem._id}
                    className="grid-line"
                        >
                    <SingleClockItem
                        clockItem={clockItem}
                        date={props.date} />
                </div>
            ))}
        </div>
    )
}


export default ClockItems;