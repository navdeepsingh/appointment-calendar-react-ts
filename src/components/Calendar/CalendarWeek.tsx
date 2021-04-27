import React from "react";
import CalendarDay from "./CalendarDay";
import cs from "classnames"
import css from "./Calendar.module.scss"
import { v1 as uuidv1 } from 'uuid';

const CalendarWeek = ({date, month}) => {
  let days = [];

  for (var i = 0; i < 7; i++) {
    let day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), "day"),
      isBefore: date.isBefore(new Date()),
      date: date
    };
    days.push(
      <CalendarDay
        key={uuidv1()}
        day={day}
      />
    );

    date = date.clone();
    date.add(1, "day");
  }

  return (
    <div className={cs(css.calendarRow, css.week)} key={uuidv1()}>
      {days}
    </div>
  );
}

export default CalendarWeek;
