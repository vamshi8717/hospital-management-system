import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'
const Appointment = () => {
  return (
    <>
    <Hero imageUrl={"/signin.png"} title={"Welcome To Leaf Village Hospital | Konoha Medical Facility"}/>
    <AppointmentForm/>
    </>
  )
}

export default Appointment