import React from "react";
import { Link } from "react-router-dom";

// Componente genérico creado para hacerle saber al usuario que está visitando una ruta protegida, 
// con flexibilidad para poner el mensaje que mejor convenga según la situación.
const AccesoRestringido = ({ 
  motivo = "Debes iniciar sesión para acceder a esta página." 
}) => {
  return (
    <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-10">
      <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className="pi pi-lock text-2xl text-red-500"></i>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Acceso Restringido
      </h2>
      
      <p className="text-gray-500 mb-6">
        {motivo}
      </p>
      
      <Link
        to="/login"
        className="inline-block bg-primario text-white font-bold py-3 px-6 rounded-lg hover:bg-terciario hover:text-primario transition"
      >
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default AccesoRestringido;