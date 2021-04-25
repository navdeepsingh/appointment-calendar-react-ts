import React, {useEffect} from "react";
import { useSelector } from 'react-redux'
import Appointment from "@src/components/Appointment";
import { getAppointments } from "@src/redux/actions"
import css from "./Calendar.module.scss"

const CalendarDay = ({day: { date, isCurrentMonth, isToday, number }}) => {

  

  return (
    <span
      className={
        css.day +
        (isToday ? ` ${css.today}` : "") +
        (isCurrentMonth ? "" : ` ${css.differentMonth}`)
      }
    >
      <Appointment
        date={date}
      >
        <span className={css.dayText}>{number}</span>       
      </Appointment>
    </span>
  );
}

export default CalendarDay;
