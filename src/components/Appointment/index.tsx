import React, { useState, useEffect } from "react";
import Popover from 'react-popover'
import classNames from "classnames"
import { IAppointment } from "@src/types/Appointment";

import css from "./Appointment.module.scss"
import { fetchPromise } from "@src/utility";

const Appointment = ({children, appointmentForDay, date}) => {
  const url = process.env.API_URL + 'appointment';
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  //const [appointmentInfo, setAppointmentInfo] = useState(false)
  const [appointment, setAppointment] = useState<IAppointment | undefined>(appointmentForDay)
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

    const data = { title: titleRef.current.value, description: descriptionRef.current.value,}
    console.log(data)

    fetchPromise(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(appointment => {
      console.log(appointment)
    }, 
    error => {
      console.log(error)
    });
  }

  const handleCancelAppointment = (e: React.MouseEvent) => {
    setAppointment({
      ...appointment,
      title: appointmentForDay.title,
      description: appointmentForDay.description,
    });
    setPopoverOpen(false)
    setEditMode(false)
  }

  const handleUpdateAppointment = (e: React.MouseEvent) => {

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
    return appointmentForDay
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
              : appointmentForDay.description
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
                <button className={css.popoverDelete}>Delete</button>
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
          <button className={css.popoverCancel}>CANCEL</button>
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
      </span>
    </Popover>
  );
}

export default Appointment;