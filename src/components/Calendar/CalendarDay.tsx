import React, {useEffect} from "react";
import css from "./Calendar.module.scss"
import Appointment from "@src/components/Appointment";

const CalendarDay = ({day: { date, isCurrentMonth, isToday, number }, appointments}) => {

  const appointmentForDay = appointments.find(({date: appointmentDate}) => {
    return appointmentDate.substring(0, appointmentDate.indexOf('T')) === date.format("YYYY-MM-DD")
  })

  return (
    <span
      className={
        css.day +
        (isToday ? ` ${css.today}` : "") +
        (isCurrentMonth ? "" : ` ${css.differentMonth}`)
      }
    >
      <Appointment
        appointmentForDay={appointmentForDay}
        date={date}
      >
        <span className={css.dayText}>{number}</span>
      </Appointment>
      {appointmentForDay ? <span className={css.eventDot} />: ""}
    </span>
  );
}

export default CalendarDay;
