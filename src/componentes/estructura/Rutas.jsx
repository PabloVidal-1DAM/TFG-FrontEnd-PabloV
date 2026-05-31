import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import DetalleProducto from "../productos/DetalleProducto";
import DetalleProveedor from "../proveedores/DetalleProveedor";
import Carrito from "../pedidos/Carrito";
import Login from "../sesion/Login";
import SignUp from "../sesion/SignUp";
import Proveedores from "../proveedores/Proveedores";
import Catalogo from "../pages/Catalogo";
import Pedidos from "../pedidos/Pedidos";
import Nosotros from "../pages/Nosotros";

import ResumenAdmin from "../admin/ResumenAdmin";
import PanelAdmin from "../admin/PanelAdmin";
import AdminProductos from "../admin/AdminProductos";
import AdminUsuarios from "../admin/AdminUsuarios";
import AdminProveedores from "../admin/AdminProveedores";
import AdminCategorias from "../admin/AdminCategorias";
import AdminCategoriasPadre from "../admin/AdminCategoriasPadre";
import AdminPedidos from "../admin/AdminPedidos";
import AdminReviews from "../admin/AdminReviews";

import AvisoLegal from "../pages/AvisoLegal";
import Privacidad from "../pages/Privacidad";
import Cookies from "../pages/Cookies";
import Terminos from "../pages/Terminos";

import NoEncontrado from "../pages/NoEncontrado";

const Rutas = () => {
  return (
    <div>
      <Routes>
        {/*Rutas públicas de mi aplicación web.*/}
        <Route path="/" element={<LandingPage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/proveedor/:id" element={<DetalleProveedor />} />

        {/*Rutas de administración.*/}
        <Route path="/admin" element={<PanelAdmin />}>
          <Route index element={<ResumenAdmin />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="proveedores" element={<AdminProveedores />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="categorias-padre" element={<AdminCategoriasPadre />} />
          <Route path="pedidos" element={<AdminPedidos />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>

        {/* Rutas Legales estáticas (de las que casi nadie de acuerda, pero yo he usado un prompt rápido para generarlas). */}
        <Route path="/legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/terminos" element={<Terminos />} />

        {/*Rutas para las NO encontradas, el error 404.*/}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </div>
  );
};

export default Rutas;
