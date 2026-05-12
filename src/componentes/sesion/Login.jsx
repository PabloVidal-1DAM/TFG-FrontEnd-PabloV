import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormularioIniciarSesion from "../formularios/formularioIniciarSesion";

// Componente que representa la página de inicio de sesión en el router dom, que contiene el componente del formulario de logeo.
const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-20 mb-20 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="pi pi-user text-2xl text-primario"></i>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">
          Iniciar Sesión
        </h2>
        <p className="text-gray-500 mt-2">Bienvenido de nuevo a TetraBIOS</p>
      </div>

      <FormularioIniciarSesion />

      {/* Enlace a Registro */}
      <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
        ¿No tienes una cuenta?{" "}
        <Link
          to="/signup"
          className="text-primario font-extrabold hover:underline"
        >
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
