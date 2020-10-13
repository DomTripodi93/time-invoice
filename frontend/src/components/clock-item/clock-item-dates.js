import React from 'react';
import ClockItems from './clock-items';
import './clock-items.styles.scss'

const ClockItemDates = props => {
    return (
        <div>
            {Object.keys(props.clockItems).length > 0 ?
                <div>
                    <div className='times-grid grid-line'>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Date</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Customer</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Start</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">End</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Hours</h5>
                        </div>
                        <div className="inner-border-left-header">
                            <h5 className="grid-header-text">Invoiced</h5>
                        </div>
                        <div className="inner-border-right-header">
                            <h5 className="grid-header-text"></h5>
                        </div>
                    </div>
                    <div className='grid100'>
                        {Object.keys(props.clockItems).map(key => (
                            <div
                                key={key}
                            >
                            <ClockItems
                                action={props.showClockItemForm}
                                clockItems={props.clockItems[key]}
                                date={key} />
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