import React, {useState, useEffect} from "react";
import moment from "moment";
import CalendarDayNames from "./CalendarDayNames";
import CalendarWeek from "./CalendarWeek";
import Chevron from '@components/Icons/Chevron'
import { IAppointment } from "@src/types/Appointment";
import {fetchPromise} from "@src/utility"
import { v1 as uuidv1 } from 'uuid';
import css from "./Calendar.module.scss"

const Calendar = () => {
  const url = process.env.API_URL + 'appointments';
  const [state, setState] = useState({
    month: moment(),
    selected: moment().startOf("day"),
  })
  const [appointments, setAppointments] = useState<IAppointment[]>([])

  useEffect(() => {
    // Fetch Appointments on Calendar Load
    fetchPromise(url)
    .then(appointments => {
      setAppointments(appointments)
    }, 
    error => {
      console.log(error)
    });
  }, [])

  const onPrevious =  () => {
    const { month } = state;
    setState({
      ...state,
      month: month.subtract(1, "month")
    })
  }
  
  const onNext =  () => {
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
          key={uuidv1()}
          date={date.clone()}
          month={month}
          selected={selected}
          appointments={appointments}
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
    return <span className={css.monthLabel}>{month.format("MMMM YYYY")}</span>;
  }

  return (
    <div className={css.calendar}>
      <header className={css.calendarHeader}>
        <div className={[css.monthDisplay, css.calendarRow].join(' ')}>
          <button onClick={onPrevious}>
            <Chevron />
          </button>            
          {renderMonthLabel()}
          <button onClick={onNext}>
            <Chevron direction="right" />
          </button>
        </div>
        <CalendarDayNames />
      </header>
      {renderWeeks()}
    </div>
  );
};

export default Calendar;
