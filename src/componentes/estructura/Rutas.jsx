import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Productos from '../productos/Productos'
import DetalleProducto from '../productos/DetalleProducto'

const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/catalogo' element={<Productos />} />
        <Route path='/producto/:id' element={<DetalleProducto />} />
      </Routes>
    </div>
  )
}

export default Rutas
