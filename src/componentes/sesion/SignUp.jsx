import React from "react";
import { Link } from "react-router-dom";
import FormularioRegistro from "../formularios/FormularioRegistro";

// Componente que representa la página de registro en el router dom, que contiene el componente del formulario de registro.
const SignUp = () => {
  return (
    <div className="max-w-md mx-auto mt-20 mb-20 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="pi pi-user-plus text-2xl text-primario"></i>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">Crear Cuenta</h2>
        <p className="text-gray-500 mt-2">Únete a la comunidad de TetraBIOS</p>
      </div>

      <FormularioRegistro />

      {/* Enlace de vuelta al Login en caso de ya tener cuenta */}
      <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="text-primario font-extrabold hover:underline"
        >
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
