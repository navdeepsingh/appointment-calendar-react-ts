import React from "react";
import Appointment from "@src/components/Appointment";
import css from "./Calendar.module.scss"

const CalendarDay = ({day: { date, isCurrentMonth, isToday, isBefore, number }}) => {

  return (
    <span
      className={
        css.day +
        (isToday ? ` ${css.today}` : "") +
        (isCurrentMonth ? "" : ` ${css.differentMonth}`) + 
        (isBefore ? ` ${css.pastDay}` : '')
      }
    >
      {
        !isBefore
        ? (
        <Appointment date={date}>
          <span className={css.dayText}>{number}</span>       
        </Appointment>)
        : <span className={css.dayText}>{number}</span>
      }      
    </span>
  );
}

export default CalendarDay;
