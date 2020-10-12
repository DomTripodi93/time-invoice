import React from 'react';
import ClockItems from './clock-items';

const ClockItemDates = props => {
    return (
        <div>
            {Object.keys(props.clockItems).length > 0 ?
                <div>
                    <div className='grid50-to-100'>
                        {Object.keys(props.clockItems).map(key => (
                            <div
                                key={key}
                            >
                            <h3>{key}</h3>
                            <ClockItems
                                action={props.showClockItemForm}
                                clockItems={props.clockItems[key]}
                                date={key} />
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


export default ClockItemDates;