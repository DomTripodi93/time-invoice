import React from 'react';
import SingleClockItem from './single-clock-item';

const ClockItems = props => {
    return (
        <div>
            {props.clockItems.length > 0 ?
                <div>
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
                </div>
                :
                null
            }
        </div>
    )
}


export default ClockItems;