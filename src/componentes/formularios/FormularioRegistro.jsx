import React from "react";
import Boton from "../ui/boton";
import useContextSesion from "../../hooks/useContextSesion";

// Formulario para dar de alta a un usuario en mi aplicación web.
const FormularioRegistro = () => {
  const {
    datosSesion,
    actualizarDatosFormulario,
    manejarRegistro,
    erroresFormulario,
  } = useContextSesion();

  return (
    <form onSubmit={manejarRegistro} noValidate className="space-y-4">
      {/* Campo Nombre */}
      <div className="flex flex-col gap-2">
        <label
          className={`font-bold text-sm ${erroresFormulario.nombre ? "text-red-500" : "text-gray-700"}`}
        >
          Nombre de Usuario
        </label>
        <div className="relative">
          <i
            className={`pi pi-user absolute left-4 top-1/2 transform -translate-y-1/2 ${erroresFormulario.nombre ? "text-red-500" : "text-gray-400"}`}
          ></i>
          <input
            type="text"
            name="nombre"
            value={datosSesion.nombre}
            onChange={actualizarDatosFormulario}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all ${
              erroresFormulario.nombre
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "bg-gray-50 border-gray-200 focus:border-primario focus:ring-primario focus:bg-white"
            }`}
            placeholder="Tu nombre"
          />
        </div>
      </div>

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
        <label
          className={`font-bold text-sm ${erroresFormulario.password ? "text-red-500" : "text-gray-700"}`}
        >
          Contraseña
        </label>
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

      {/* Campo Confirmar Contraseña */}
      <div className="flex flex-col gap-2">
        <label
          className={`font-bold text-sm ${erroresFormulario.password_confirmation ? "text-red-500" : "text-gray-700"}`}
        >
          Confirmar Contraseña
        </label>
        <div className="relative">
          <i
            className={`pi pi-check-circle absolute left-4 top-1/2 transform -translate-y-1/2 ${erroresFormulario.password_confirmation ? "text-red-500" : "text-gray-400"}`}
          ></i>
          <input
            type="password"
            name="password_confirmation"
            value={datosSesion.password_confirmation}
            onChange={actualizarDatosFormulario}
            className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition-all ${
              erroresFormulario.password_confirmation
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "bg-gray-50 border-gray-200 focus:border-primario focus:ring-primario focus:bg-white"
            }`}
            placeholder="••••••••"
          />
        </div>
      </div>

      <Boton
        tipo="submit"
        formNoValidate
        variante="primario"
        className="w-full py-4 text-lg mt-4 font-bold shadow-lg shadow-primario/30 hover:cursor-pointer"
      >
        Crear Cuenta <i className="pi pi-user-plus ml-2"></i>
      </Boton>
    </form>
  );
};

export default FormularioRegistro;
