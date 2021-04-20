import React from "react";
import css from "./Calendar.module.scss"

const CalendarDayNames = () => {
  return (
    <div className={[css.calendarRow, css.dayNames].join(' ')}>
      <span className={css.day}>Sun</span>
      <span className={css.day}>Mon</span>
      <span className={css.day}>Tue</span>
      <span className={css.day}>Wed</span>
      <span className={css.day}>Thu</span>
      <span className={css.day}>Fri</span>
      <span className={css.day}>Sat</span>
    </div>
  );
}
export default CalendarDayNames
