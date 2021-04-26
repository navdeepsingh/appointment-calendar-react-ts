import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Popover from 'react-popover'
import classNames from "classnames"
import { IAppointment } from "@src/types/Appointment";

import css from "./Appointment.module.scss"
import { fetchPromise } from "@src/utility";
import {deleteAppointment, getAppointments, setAppointments} from '@src/redux/actions'

const Appointment = ({children, date}) => {
  const url = process.env.API_URL + 'appointment';
  const dispatch = useDispatch();
  
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const [appointment, setAppointment] = useState<IAppointment | undefined>(undefined)

  let appointments = useSelector(getAppointments)

  useEffect(() => {
    if (appointments.length) {
      const appointmentForDay = appointments.find(({date: appointmentDate}) => {
        return appointmentDate.substring(0, appointmentDate.indexOf('T')) === date.format("YYYY-MM-DD")
      })
      console.log(appointmentForDay)
      setAppointment(appointmentForDay)
    }
  },[appointments])


  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);

  const onOpenPopover = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setPopoverOpen(true)
  }

  const onClosePopover = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setPopoverOpen(false)
    setEditMode(false)
  }

  const handleNewAppointment = (e: React.MouseEvent) => {
    e.preventDefault();

    const data = { 
      title: titleRef.current.value, 
      description: descriptionRef.current.value,
      date: date.format("YYYY-MM-DD")
    }

    fetchPromise(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(appointment => {
      dispatch(setAppointments(appointment))
      setPopoverOpen(false)
    }, 
    error => {
      console.log(error)
    });
  }

  const handleCancelAppointment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setAppointment({
      ...appointment,
      title: appointment?.title,
      description: appointment?.description,
    });
    setPopoverOpen(false)
    setEditMode(false)
  }

  const handleUpdateAppointment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = { 
      _id: appointment._id,
      title: appointment.title, 
      description: appointment.description
    }
    console.log(data)

    fetchPromise(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    .then(appointment => {
      console.log(appointment)
      setAppointment({
        ...appointment,
        title: appointment?.title,
        description: appointment?.description,
      });
      //dispatch(setAppointments(appointment))
      setPopoverOpen(false)
    }, 
    error => {
      console.log(error)
    });
  }

  const handleDeleteAppointment = (e: React.MouseEvent) => {
    e.preventDefault();

    const data = { 
      _id: appointment._id
    }

    fetchPromise(url, {
      method: 'DELETE',
      body: JSON.stringify(data)
    })
    .then(result => {
      dispatch(deleteAppointment(appointment))
      setPopoverOpen(false)
    }, 
    error => {
      console.log(error)
    });
  }
  

  const handleEditModeClick = (e: React.MouseEvent) => {
    e.preventDefault()

    setEditMode(true)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({
      ...appointment,
      title: e.target.value,
    })
  }
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({
      ...appointment,
      description: e.target.value,
    })
  }

  const renderPopover = () => {
    return appointment
    ? ( 
      <div className={css.popoverContainer}>
        <div className={css.popoverSubcontainer}>
          <span className={css.popoverHeading}>          
            <span className={css.appointmentText}>{appointment.title}</span>
            <button onClick={onClosePopover}>X</button>
          </span>
          <div className={css.popoverContent}>
            {
              isEditMode ?              
              (<>
                <div className={css.popoverInputRow}>
                  <label htmlFor="title">Title:</label>
                  <input type="text" name="title" id="title" value={appointment.title} onChange={handleTitleChange} />
                </div>
                <div className={css.popoverInputRow}>
                  <label htmlFor="description">Description:</label>
                  <textarea name="description" id="description" value={appointment.description} onChange={handleDescriptionChange} />
                </div>
              </>)
              : appointment.description
            }
          </div>
          <div className={css.popoverActions}>
          {
             isEditMode ?
             (
               <>
                <button className={css.popoverCancel} onClick={handleCancelAppointment}>CANCEL</button>
                <button className={css.popoverEdit} onClick={handleUpdateAppointment}>SUBMIT</button>
              </>
                           
             )
             : (
              <>
                <button className={css.popoverDelete} onClick={handleDeleteAppointment}>Delete</button>
                <button className={css.popoverEdit} onClick={handleEditModeClick}>Edit</button>
              </>  
             )
          }
          </div>
          
        </div>      
      </div>           
    )
    : (
    <div className={css.popoverContainer}>
      <form>
      <div className={css.popoverSubcontainer}>
        <span className={css.popoverHeading}>
          <span className={css.appointmentText}>New Appointment</span>
          <button onClick={onClosePopover}>X</button>
        </span>
         <div className={css.popoverContent}>         
          <div className={css.popoverInputRow}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" ref={titleRef} />
          </div>
          <div className={css.popoverInputRow}>
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" ref={descriptionRef} />
          </div>          
        </div>
        <div className={css.popoverActions}>
          <button className={css.popoverCancel} onClick={handleCancelAppointment}>CANCEL</button>
          <button className={css.popoverEdit} onClick={handleNewAppointment}>SUBMIT</button>
        </div>
      </div>
      </form>
      </div>)
  }
    
  return (
    <Popover
      isOpen={isPopoverOpen}
      preferPlace="above"
      containerClassName="popover-container"
      body={renderPopover()}
      onOuterAction={onClosePopover}
    >
      <span onClick={onOpenPopover}>
        {children}
        {appointment ? <span className={css.apppointmentDot}></span>: ''}
      </span>
    </Popover>
  );
}

export default Appointment;