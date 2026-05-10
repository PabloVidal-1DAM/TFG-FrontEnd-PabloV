import React from "react";
import { Link } from "react-router-dom";
import useContextSesion from "../../hooks/useContextSesion";

const IconoUsuario = ({ esMovil = false }) => {
  const { sesionIniciada, usuario } = useContextSesion();

  // Si estamos en el menú móvil y NO hay sesión, no pintamos nada 
  // (para no duplicar los botones grandes que ya tienes abajo).
  if (esMovil && !sesionIniciada) return null;

  return (
    <div className={`flex items-center gap-3 text-white ${esMovil ? 'mb-6 pb-6 border-b border-green-800' : ''}`}>
      <div className="bg-white/20 p-2 rounded-full flex items-center justify-center">
        <i className={`pi pi-user ${esMovil ? 'text-xl p-1' : 'text-lg'}`}></i>
      </div>
      
      {/* Si se usa en el menú móvil se muestrea siempre. Si es PC, se oculta en pantallas pequeñas (hidden sm:block). */}
      <div className={esMovil ? "block" : "hidden sm:block"}>
        {sesionIniciada ? (
          <span className={`font-bold tracking-wide cursor-default ${esMovil ? 'text-xl' : 'text-sm'}`}>
            Hola, {usuario.nombre || usuario.name}
          </span>
        ) : (
          <Link to="/login" className="font-bold text-sm hover:underline tracking-wide">
            Entrar / Registro
          </Link>
        )}
      </div>
    </div>
  );
};

export default IconoUsuario;