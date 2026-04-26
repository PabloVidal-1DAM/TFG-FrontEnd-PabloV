import {React, useState} from "react";
import Boton from "../ui/boton";
import useContextSesion from "../hooks/useContextSesion";

const FormularioIniciarSesion = () => {
  const { ponerMensaje } = useContextSesion();

  // Estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función que se ejecuta al enviar el formulario
  const manejarLogin = (e) => {
    e.preventDefault(); // Evita que la página recargue de golpe

    // 1. Validación básica en frontend
    if (email.trim() === "" || password.trim() === "") {
      ponerMensaje("error", "Por favor, rellena todos los campos.");
      return;
    }

    // 2. Simulacro temporal (Aquí irá tu petición a Laravel)
    ponerMensaje("info", "Conectando con el servidor...");
    console.log("Intentando iniciar sesión con:", email, password);
  };
  return (
    <form onSubmit={manejarLogin} className="space-y-6">
      {/* Campo Email */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">
          Correo Electrónico
        </label>
        <div className="relative">
          <i className="pi pi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario focus:bg-white transition-all"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      {/* Campo Contraseña */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="font-bold text-gray-700 text-sm">Contraseña</label>
          <a
            href="#"
            className="text-xs text-primario font-medium hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative">
          <i className="pi pi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario focus:bg-white transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Botón de Submit */}
      <Boton
        variante="primario"
        className="w-full py-4 text-lg mt-4 font-bold shadow-lg shadow-primario/30 hover:cursor-pointer"
      >
        Entrar <i className="pi pi-sign-in ml-2"></i>
      </Boton>
    </form>
  );
};

export default FormularioIniciarSesion;
