import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'

const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default Rutas
