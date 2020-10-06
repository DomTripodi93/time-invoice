import React, { useEffect, useState } from 'react';
import CalendarHelper from '../../../shared/calendar-helper';

const Calendar = props => {
    const [month, setMonth] = useState(props.month);
    const [year, setYear] = useState(props.year);
    const helper = new CalendarHelper();
    const monthDays = helper.setDays(year, month)
    const firstDayOfMonth = helper.setFirstDays(year, month);
    const today = props.date.getDate();
    const thisMonth = props.thisMonth;
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    useEffect(() => {
        setMonth(props.month);
        setYear(props.year);
    }, [props])


    return (
        <div>
            <div className="grid7split border">
                {days.map(day => (
                    <div key={day} className="day-label-border">
                        <h5 className="centered label-text">{day}</h5>
                    </div>
                ))}
                {firstDayOfMonth.map(date => (
                    <div key={date} className="day-border"></div>
                ))}
                {monthDays.map(date => (
                    <div key={date}>
                        {date !== today || (date === today && month !== thisMonth) ?
                            <div className="day-border padded">
                                <h5 className="label-text date">{date}</h5>
                            </div>
                            :
                            null
                        }
                        {date === today && month === thisMonth ?
                            <div className="today-border padded" >
                                <h5 className="label-text date">{date}</h5>
                            </div>
                            :
                            null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;