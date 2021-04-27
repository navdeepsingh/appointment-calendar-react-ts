import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import moment from "moment";
import CalendarDayNames from "./CalendarDayNames";
import CalendarWeek from "./CalendarWeek";
import Chevron from '@components/Icons/Chevron'
import {fetchPromise} from "@src/utility"
import { v1 as uuidv1 } from 'uuid';
import {setAppointments} from '@src/redux/actions'
import {API_APPOINTMENTS, TEXTS} from '@src/constants'
import css from "./Calendar.module.scss"

const Calendar = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({month: moment()})  

  useEffect(() => {   
    // fetch new appointments on page load 
    fetchPromise(API_APPOINTMENTS)
    .then(newData => {
      dispatch(setAppointments(newData))
      const message = newData.length ? `${newData.length} Appointment(s) Loaded`: TEXTS.APPOINTMENTS_LOADING_SUCCESS_NULL
      toast.success(message)      
    }, 
    error => {
      console.log(error)
      toast.warn(TEXTS.APPOINTMENTS_LOADING_ERROR);
    });
  }, []);
  
  const onPrevious = () => {
    const {month} = state;
    setState({...state, month: month.subtract(1, "month")})
  }
  
  const onNext = () => {
    const {month} = state;
    setState({...state, month: month.add(1, "month")})
  }

  const renderWeeks = () => {
    const {month} = state;
    let weeks = [];
    let done = false;
    let date = month
      .clone()
      .startOf("month")      
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();    

    while (!done) {
      weeks.push(
        <CalendarWeek
          key={uuidv1()}
          date={date.clone()}
          month={month}
        />
      );

      date.add(1, "w");

      done = count++ >= 3 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  const renderMonthLabel= () => {
    const {month} = state;
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
