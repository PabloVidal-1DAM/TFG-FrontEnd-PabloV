import React from "react";
import Boton from "../ui/boton";
import useContextSesion from "../../hooks/useContextSesion";

const FormularioRegistro = () => {
  const { 
    datosSesion, 
    actualizarDatosFormulario,
    manejarRegistro
  } = useContextSesion();

  return (
    <form onSubmit={manejarRegistro} noValidate className="space-y-4">
      {/* Campo Nombre */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">Nombre de Usuario</label>
        <div className="relative">
          <i className="pi pi-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            name="nombre"
            value={datosSesion.nombre}
            onChange={actualizarDatosFormulario}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario transition-all"
            placeholder="Tu nombre"
          />
        </div>
      </div>

      {/* Campo Email */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">Correo Electrónico</label>
        <div className="relative">
          <i className="pi pi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="email"
            name="email"
            value={datosSesion.email}
            onChange={actualizarDatosFormulario}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario transition-all"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      {/* Campo Contraseña */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">Contraseña</label>
        <div className="relative">
          <i className="pi pi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="password"
            name="password"
            value={datosSesion.password}
            onChange={actualizarDatosFormulario}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Campo Confirmar Contraseña */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">Confirmar Contraseña</label>
        <div className="relative">
          <i className="pi pi-check-circle absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="password"
            name="password_confirmation"
            value={datosSesion.password_confirmation}
            onChange={actualizarDatosFormulario}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Botón de Submit */}
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
