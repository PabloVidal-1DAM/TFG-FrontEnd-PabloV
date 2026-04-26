import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Productos from '../productos/Productos'
import DetalleProducto from '../productos/DetalleProducto'
import Carrito from '../pedidos/Carrito'
import Login from '../sesion/Login'
import SignUp from '../sesion/SignUp'

const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/catalogo' element={<Productos />} />
        <Route path='/producto/:id' element={<DetalleProducto />} />
        <Route path='/carrito' element={<Carrito />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default Rutas
