// Action Types
export const SET_APPOINTMENTS = "SET_APPOINTMENTS";
export const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";

// Action Creators
export const setAppointments = (appointments) => ({
  type: SET_APPOINTMENTS,
  payload: appointments,
});

export const deleteAppointment = (appointment) => ({
  type: DELETE_APPOINTMENT,
  payload: appointment,
});

// Selectors

export const getAppointments = (state) => state.appointments;
