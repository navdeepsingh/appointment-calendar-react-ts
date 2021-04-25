import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import moment from "moment";
import CalendarDayNames from "./CalendarDayNames";
import CalendarWeek from "./CalendarWeek";
import Chevron from '@components/Icons/Chevron'
import { IAppointment } from "@src/types/Appointment";
import {fetchPromise} from "@src/utility"
import { v1 as uuidv1 } from 'uuid';
import css from "./Calendar.module.scss"
import useFetchAppointments from "../../hooks/useFetchAppointments";
import {setAppointments} from '@src/redux/actions'

const Calendar = () => {
  const dispatch = useDispatch();
  const url = process.env.API_URL + 'appointments';

  useEffect(() => {   
    // fetch new data
    fetchPromise(url)
    .then(newData => {
      dispatch(setAppointments(newData))
    }, 
    error => {
      console.log(error)
    });
  }, []);
  

  const [state, setState] = useState({
    month: moment(),
    selected: moment().startOf("day"),
  })  

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
    return <span className={css.monthLabel} data-testid="monthName">{month.format("MMMM YYYY")}</span>;
  }

  return (
    <div data-testid="calendar" className={css.calendar}>
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
