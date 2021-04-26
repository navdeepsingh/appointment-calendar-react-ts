import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const initialState = {
  appointments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS": {
      const appointments = action.payload || [];
      return {
        ...state,
        appointments,
      };
    }
    case "ADD_APPOINTMENT": {
      const newAppointment = action.payload;
      const appointments = [...state.appointments, newAppointment];
      return {
        ...state,
        appointments,
      };
    }
    case "DELETE_APPOINTMENT": {
      const toBeDeleteAppointment = action.payload;
      const revisedAppointments = state.appointments.filter(
        (e) => e._id !== toBeDeleteAppointment._id
      );
      return {
        ...state,
        appointments: revisedAppointments,
      };
    }
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
