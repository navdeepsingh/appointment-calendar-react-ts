import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Popover from 'react-popover'
import { IAppointment } from "@src/types/Appointment";
import {API_APPOINTMENT, TEXTS} from '@src/constants'

import css from "./Appointment.module.scss"
import { fetchPromise } from "@src/utility";
import {deleteAppointment, getAppointments, addAppointment} from '@src/redux/actions'

const Appointment = ({children, date}) => {  
  const dispatch = useDispatch();
  
  const [status, setStatus] = useState({loading: false, error: null})
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const [appointment, setAppointment] = useState<IAppointment | undefined>(undefined)

  let appointments = useSelector(getAppointments)

  useEffect(() => {
    if (appointments.length > 0) {
      const appointmentForDay = appointments.find(({date: appointmentDate}) => {
        return appointmentDate.substring(0, appointmentDate.indexOf('T')) === date.format("YYYY-MM-DD")
      })
      setAppointment(appointmentForDay)
    }
  },[appointments])


  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

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
    setStatus({...status, loading: true})

    const data = { 
      title: titleRef.current.value, 
      description: descriptionRef.current.value,
      date: date.format("YYYY-MM-DD")
    }

    fetchPromise(API_APPOINTMENT, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(appointment => {
      console.log(appointment)
      dispatch(addAppointment(appointment))
      setAppointment(appointment)
      setPopoverOpen(false)
      setStatus({...status, loading: false})
      toast.success(TEXTS.APPOINTMENT_ADD_SUCCESS)
    }, 
    error => {
      console.log(error)
      setStatus({...status, loading: false})
      toast.error(`Error: ${error.message}`)
    });
  }

  const handleCancelAppointment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setPopoverOpen(false)
    setEditMode(false)
  }

  const handleUpdateAppointment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus({...status, loading: true})

    const data = { 
      _id: appointment._id,
      title: appointment.title, 
      description: appointment.description
    }

    fetchPromise(API_APPOINTMENT, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    .then(appointment => {
      setAppointment({
        ...appointment,
        title: appointment?.title,
        description: appointment?.description,
      });
      setPopoverOpen(false)
      setEditMode(false)
      setStatus({...status, loading: false})
      toast.success(TEXTS.APPOINTMENT_UPDATE_SUCCESS)
    }, 
    error => {
      console.log(error)
      setEditMode(false)
      setStatus({...status, loading: false})
      toast.error(TEXTS.APPOINTMENT_UPDATE_ERROR)
    });
  }

  const handleDeleteAppointment = (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus({...status, loading: true})

    const data = { 
      _id: appointment._id
    }

    fetchPromise(API_APPOINTMENT, {
      method: 'DELETE',
      body: JSON.stringify(data)
    })
    .then(() => {
      dispatch(deleteAppointment(appointment))
      setPopoverOpen(false)
      setAppointment(undefined)
      setStatus({...status, loading: false})
      toast.success(TEXTS.APPOINTMENT_DELETE_SUCCESS)
    }, 
    error => {
      console.log(error)
      setStatus({...status, loading: false})
      toast.success(TEXTS.APPOINTMENT_DELETE_ERROR)
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
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                  <div className={css.popoverInput}>
                    <input type="text" name="title" id="title" value={appointment.title} onChange={handleTitleChange} />
                    {!appointment.title.length ? <span className={css.error}>Please fill this field</span>: ''}                    
                  </div>
                </div>
                <div className={css.popoverInputRow}>
                  <label htmlFor="description">Description:</label>
                  <div className={css.popoverInput}>
                    <textarea name="description" id="description" value={appointment.description} onChange={handleDescriptionChange} />
                  </div>
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
                <button className={css.popoverEdit} onClick={handleUpdateAppointment} disabled={status.loading}>{!status.loading ? 'UPDATE': 'UPDATING...'}</button>
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
            <div className={css.popoverInput}>
              <input type="text" name="title" id="title" ref={titleRef} />
            </div>
          </div>
          <div className={css.popoverInputRow}>
            <label htmlFor="description">Description:</label>
            <div className={css.popoverInput}>
              <textarea name="description" id="description" ref={descriptionRef} />
            </div>
          </div>          
        </div>
        <div className={css.popoverActions}>
          <button className={css.popoverCancel} onClick={handleCancelAppointment}>CANCEL</button>
          <button className={css.popoverEdit} onClick={handleNewAppointment} disabled={status.loading}>{!status.loading ? 'SUBMIT': 'SUBMITING...'}</button>
        </div>
      </div>
      </form>
    </div>)
  }
    
  return (
    <Popover
      isOpen={isPopoverOpen}
      preferPlace="above"
      containerClassName={css.popoverContainer}
      body={renderPopover()}
      onOuterAction={onClosePopover}
    >
      <span onClick={onOpenPopover}>
        {children}
        {appointment ? <span className={css.appointmentDate}></span>: ''}
      </span>
    </Popover>
  );
}

export default Appointment;