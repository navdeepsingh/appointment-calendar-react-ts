import React, {useState} from "react";
import moment from "moment";
import CalendarDayNames from "./CalendarDayNames";
import CalendarWeek from "./CalendarWeek";
import css from "./Calendar.module.scss"

const Calendar = () => {

  const [state, setState] = useState({
    month: moment(),
    selected: moment().startOf("day"),
  })

  const previous =  () => {
    const { month } = state;
    setState({
      ...state,
      month: month.subtract(1, "month")
    })
  }
  
  const next =  () => {
    const { month } = state;
    setState({
      ...state,
      month: month.add(1, "month")
    })
  }

  const renderWeeks = () => {
    const { month, selected } = state;
    let weeks = [];
    let done = false;
    let date = month
      .clone()
      .startOf("month")
      .add("w" - 1)
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();    

    while (!done) {
      weeks.push(
        <CalendarWeek
          key={Math.random()}
          date={date.clone()}
          month={month}
          selected={selected}
        />
      );

      date.add(1, "w");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  const renderMonthLabel= () => {
    const { month } = state;
    return <span className="month-label">{month.format("MMMM YYYY")}</span>;
  }

  return (
    <div className={css.calendar}>
      <header className={css.calendarHeader}>
        <div className={[css.monthDisplay, css.calendarRow].join(' ')}>
          <button onClick={previous}>Previous</button>            
          {renderMonthLabel()}
          <button onClick={next}>Next</button>
        </div>
        <CalendarDayNames />
      </header>
      {renderWeeks()}
    </div>
  );
};

export default Calendar;
