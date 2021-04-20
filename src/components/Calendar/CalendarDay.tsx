import React from "react";
import css from "./Calendar.module.scss"

const CalendarDay = ({day: { date, isCurrentMonth, isToday, number }}) => {

  let eventsForDay;

  return (
    <span
      className={
        css.day +
        (isToday ? ` ${css.today}` : "") +
        (isCurrentMonth ? "" : ` ${css.differentMonth}`)
      }
    >
      <span className={css.dayText}>{number}</span>
      {eventsForDay !== undefined ?  eventsForDay.length >= 1 ? <span className={css.eventDot} />: "" : ""}
    </span>
  );
}

export default CalendarDay;
