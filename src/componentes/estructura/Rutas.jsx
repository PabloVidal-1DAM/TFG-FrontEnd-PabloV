import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Productos from '../productos/Productos'
import DetalleProducto from '../productos/DetalleProducto'
import Carrito from '../pedidos/Carrito'

const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/catalogo' element={<Productos />} />
        <Route path='/producto/:id' element={<DetalleProducto />} />
        <Route path='/carrito' element={<Carrito />} />
      </Routes>
    </div>
  )
}

export default Rutas
