import React from "react";
import CalendarDay from "./CalendarDay";
import css from "./Calendar.module.scss"
import { v1 as uuidv1 } from 'uuid';

const CalendarWeek = ({date, month, selected, select}) => {
  let days = [];

  for (var i = 0; i < 7; i++) {
    let day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), "day"),
      date: date
    };
    days.push(
      <CalendarDay
        key={uuidv1()}
        day={day}
        selected={selected}
        select={select}
      />
    );

    date = date.clone();
    date.add(1, "day");
  }

  return (
    <div className={[css.calendarRow, css.week].join(' ')} key={Math.random()}>
      {days}
    </div>
  );
}

export default CalendarWeek;
