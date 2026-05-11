import React from "react";
import Boton from "../ui/boton";
import useContextSesion from "../../hooks/useContextSesion";

const FormularioIniciarSesion = () => {
  // 1. Extraemos todo el arsenal que preparamos en el Proveedor
  const {
    datosSesion,
    actualizarDatosFormulario,
    manejarLogin,
    erroresFormulario
  } = useContextSesion();

  return (
    <form onSubmit={manejarLogin} noValidate className="space-y-6">
      {/* Campo Email */}
      <div className="flex flex-col gap-2">
        <label
          className={`font-bold text-sm ${erroresFormulario.email ? "text-red-500" : "text-gray-700"}`}
        >
          Correo Electrónico
        </label>
        <div className="relative">
          <i
            className={`pi pi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 ${erroresFormulario.email ? "text-red-500" : "text-gray-400"}`}
          ></i>
          <input
            type="email"
            name="email"
            value={datosSesion.email}
            onChange={actualizarDatosFormulario}
            // Clases dinámicas para el borde rojo y fondo rojo suave
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all ${
              erroresFormulario.email
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "bg-gray-50 border-gray-200 focus:border-primario focus:ring-primario focus:bg-white"
            }`}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      {/* Campo Contraseña */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label
            className={`font-bold text-sm ${erroresFormulario.password ? "text-red-500" : "text-gray-700"}`}
          >
            Contraseña
          </label>
          <a
            href="#"
            className="text-xs text-primario font-medium hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative">
          <i
            className={`pi pi-lock absolute left-4 top-1/2 transform -translate-y-1/2 ${erroresFormulario.password ? "text-red-500" : "text-gray-400"}`}
          ></i>
          <input
            type="password"
            name="password"
            value={datosSesion.password}
            onChange={actualizarDatosFormulario}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all ${
              erroresFormulario.password
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "bg-gray-50 border-gray-200 focus:border-primario focus:ring-primario focus:bg-white"
            }`}
            placeholder="••••••••"
          />
        </div>
      </div>

      <Boton
        tipo="submit"
        variante="primario"
        className="w-full py-4 text-lg mt-4 font-bold shadow-lg shadow-primario/30 hover:cursor-pointer"
      >
        Entrar <i className="pi pi-sign-in ml-2"></i>
      </Boton>
    </form>
  );
};

export default FormularioIniciarSesion;
