import React from 'react'
import css from "./Appointment.module.scss"

export const NewAppointmentForm = ({
  status = {loading: false},
  titleRef,
  descriptionRef,
  onClosePopover,
  handleCancelAppointment,
  handleNewAppointment,
}) => {
  return (
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
    </div>
  )
}