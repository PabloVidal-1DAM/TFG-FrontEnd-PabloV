import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Productos from '../productos/Productos'
import DetalleProducto from '../productos/DetalleProducto'
import DetalleProveedor from '../proveedores/DetalleProveedor'
import Carrito from '../pedidos/Carrito'
import Login from '../sesion/Login'
import SignUp from '../sesion/SignUp'
import Proveedores from '../proveedores/Proveedores'

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
        <Route path='/proveedores' element={<Proveedores />} />
        <Route path='/proveedor/:id' element={<DetalleProveedor />} />
      </Routes>
    </div>
  )
}

export default Rutas
