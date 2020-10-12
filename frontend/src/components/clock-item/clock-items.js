import React from 'react';
import SingleClockItem from './single-clock-item';
import './clock-items.styles.scss'

const ClockItems = props => {
    return (
        <div>
            {props.clockItems.length > 0 ?
                <div>
                    <div className='grid100'>
                        <div className='times-grid'>
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
                        {props.clockItems.map(clockItem => (
                            <div
                                key={clockItem._id} >
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
                        No clock items for {props.date}
                    </h4>
                </div>
            }
        </div>
    )
}


export default ClockItems;