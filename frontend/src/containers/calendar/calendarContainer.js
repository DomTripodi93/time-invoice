import React from 'react';
import CalendarNew from '../../components/calendar/calendar-new';
import Calendar from '../../components/calendar/calendar';


const CalendarContainer = props => {
    const date = new Date();
    const thisMonth = date.getMonth();
    const [month, setMonth] = useState(thisMonth);
    const [year, setYear] = useState(date.getFullYear());

    const updateMonth = (selectedMonth) => {
        let monthSplit = selectedMonth.split("-");
        setYear(monthSplit[0]);
        setMonth(+monthSplit[1] - 1);
    }

    return (
        <div>
            <div className="space-top">
                <CalendarNew
                    callback={updateMonth}
                    month={month}
                    year={year} />
            </div>
            <Calendar
                employeeId={props.match.params.employeeId}
                scheduledTasks = {props.selectedTasks}
                date={date}
                month={month}
                thisMonth={thisMonth}
                year={year}
                isRoot={isRoot}
                canEdit={canEdit} />
        </div>
    )
}

export default CalendarContainer;