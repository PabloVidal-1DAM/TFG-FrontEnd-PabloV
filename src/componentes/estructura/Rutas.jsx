import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Productos from '../productos/Productos'

const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/catalogo' element={<Productos />} />
      </Routes>
    </div>
  )
}

export default Rutas
