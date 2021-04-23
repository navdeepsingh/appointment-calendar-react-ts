import React, { useState, useEffect } from "react";
import Popover from 'react-popover'
import classNames from "classnames"
import { IAppointment } from "@src/types/Appointment";

import css from "./Appointment.module.scss"

const Appointment = ({children, appointmentForDay, date}) => {

  const [isPopoverOpen, setPopoverOpen] = useState(false)
  // const [appointment, setAppointment] = useState<IAppointment | undefined>(undefined)

  const onOpenPopover = () => {
    console.log(appointmentForDay)
    setPopoverOpen(true)
  }

  const onClosePopover = () => {
    setPopoverOpen(false)
  }

  const renderPopover = () => {
    return appointmentForDay
    ? (            
      <div className={css.popoverSubcontainer}>
        <span className={css.popoverHeading}>          
          <span className="eventText">{appointmentForDay.title}</span>
          <button onClick={onClosePopover}>Close</button>
        </span>
        <div className="popover-content">
          {appointmentForDay.description}
        </div>
        <div className="popover-actions">
          <span className="popover-apply">Edit</span>
          <span className="popover-apply">Delete</span>
        </div>
      </div>      
    )
    : (<div className={css.popoverSubcontainer}>
        <span className={css.popoverHeading}>                    
          <button onClick={onClosePopover}>Close</button>
        </span>
        <div className="popover-content">
          Test
        </div>
        <div className="popover-actions">
          <span className="popover-apply">Edit</span>
          <span className="popover-apply">Delete</span>
        </div>
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