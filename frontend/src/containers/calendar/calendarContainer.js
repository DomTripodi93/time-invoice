
const ScheduleContainer = props => {
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
            <MessageTopContainer />
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
            <MessagePagedContainer />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSchedulesByMonth: (date) => dispatch(fetchSchedulesByMonth(date)),
        selectSchedulesInState: (date) => dispatch(selectSchedulesInStateForEmployee(date)),
        setIsRoot: (isRoot) => dispatch(setIsRoot(isRoot))
    }
}


const mapStateToProps = state => ({
    scheduledTasks: state.schedule.scheduledTasks.employee,
    isRoot: state.schedule.isRoot,
    canEdit: state.user.canEdit,
    selectedTasks: state.schedule.selectedScheduledTasks,
    userId: state.user.userId,
    rootId: state.user.rootId
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);