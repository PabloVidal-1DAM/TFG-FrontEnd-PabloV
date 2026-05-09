import { React, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import useContextSesion from "../../hooks/useContextSesion";
import Boton from "../ui/boton";
import IconoUsuario from "../ui/IconoUsuario";

const MenuMovil = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { sesionIniciada, cerrarSesion } = useContextSesion();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    setMenuAbierto(false);
  };

  return (
    <>
      <div className="flex md:hidden justify-end">
        <button
          onClick={() => setMenuAbierto(true)}
          className="text-white hover:text-terciario transition p-2 focus:outline-none"
        >
          <i className="pi pi-bars text-3xl"></i>
        </button>
      </div>

      <Sidebar
        visible={menuAbierto}
        position="right"
        onHide={() => setMenuAbierto(false)}
        className="bg-primario text-white w-64"
      >
        <div className="flex flex-col space-y-6 mt-8 text-lg">
          
          {/* ¡AQUÍ ESTÁ! Le decimos que se comporte como móvil */}
          <IconoUsuario esMovil={true} />

          <NavLink
            to="/catalogo"
            onClick={() => setMenuAbierto(false)}
            className={({ isActive }) =>
              isActive
                ? "text-terciario font-bold border-l-4 border-terciario pl-3"
                : "text-white hover:text-terciario pl-3 transition"
            }
          >
            Catálogo
          </NavLink>

          <NavLink
            to="/nosotros"
            onClick={() => setMenuAbierto(false)}
            className={({ isActive }) =>
              isActive
                ? "text-terciario font-bold border-l-4 border-terciario pl-3"
                : "text-white hover:text-terciario pl-3 transition"
            }
          >
            Nosotros
          </NavLink>

          <div className="pt-6 mt-4 border-t border-green-800 px-3">
            {/* LÓGICA CONDICIONAL: Mostramos unos botones u otros */}
            {sesionIniciada ? (
              <Boton
                evento={manejarCerrarSesion}
                variante="peligro"
                className="bg-red-600 text-white mb-4 text-center font-bold px-4 py-3 rounded-md hover:bg-red-700 transition block w-full"
              >
                Cerrar Sesión <i className="pi pi-sign-out ml-1"></i>
              </Boton>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuAbierto(false)}
                  className="bg-terciario text-primario mb-4 text-center font-bold px-4 py-3 rounded-md hover:bg-white transition block w-full"
                >
                  Iniciar Sesión
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuAbierto(false)}
                  className="bg-terciario text-primario mb-4 text-center font-bold px-4 py-3 rounded-md hover:bg-white transition block w-full"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default MenuMovil;