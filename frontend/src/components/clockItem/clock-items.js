import React from 'react';
import SingleClockItem from './single-clock-item';

const ClockItems = props => {
    return (
        <div>
            {props.clockItems.length > 0 ?
                <div>
                    <div className='grid50-to-100'>
                        {props.clockItems.map(clockItem => (
                            <div
                                key={clockItem._id}
                            >
                                <SingleClockItem
                                    clockItem={clockItem} />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any clock items!
                    </h4>
                    <h4 className="spaced">
                        Add some clock items using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default ClockItems;