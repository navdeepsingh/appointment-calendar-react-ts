import React from 'react'
import { render, screen } from '@testing-library/react'
import { NewAppointmentForm } from '@components/Appointment/NewAppointmentForm'

describe('New Appointment Form', () => {
  it('should open a create new appointment form', async () => {
    render(<NewAppointmentForm />)
    expect(await screen.findByText('New Appointment')).toBeTruthy();
  })
})