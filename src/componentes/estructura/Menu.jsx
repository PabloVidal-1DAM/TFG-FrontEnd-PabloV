import { React } from "react";
import { NavLink, Link } from "react-router-dom";
import MenuMovil from "./MenuMovil";
import useContextSesion from "../../hooks/useContextSesion";
import Boton from "../ui/boton";

const Menu = () => {
  const { sesionIniciada, cerrarSesion } = useContextSesion();
  return (
    <>
      {/* MENÚ DE ESCRITORIO (Oculto en móvil, visible en md)*/}
      <nav className="hidden min-[1004px]:flex justify-end items-center space-x-8">
        <NavLink
          to="/catalogo"
          className={({ isActive }) =>
            isActive
              ? "text-terciario font-bold transition"
              : "text-white hover:text-terciario transition"
          }
        >
          Catálogo
        </NavLink>

        <NavLink
          to="/nosotros"
          className={({ isActive }) =>
            isActive
              ? "text-terciario font-bold transition"
              : "text-white hover:text-terciario transition"
          }
        >
          Nosotros
        </NavLink>

                <NavLink
          to="/proveedores"
          className={({ isActive }) =>
            isActive
              ? "text-terciario font-bold transition"
              : "text-white hover:text-terciario transition"
          }
        >
          Proveedores
        </NavLink>
        {!sesionIniciada ? (
          <>
            <Link
              to="/login"
              className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-terciario hover:text-primario transition whitespace-nowrap"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/signup"
              className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-terciario hover:text-primario transition whitespace-nowrap"
            >
              Registrarse
            </Link>
          </>
        ) : (
          <Boton
            evento={cerrarSesion}
            variante="peligro"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            <i className="pi pi-sign-out ml-1"></i>
          </Boton>
        )}
      </nav>
      {/*MENÚ LATERAL MÓVIL (He usado el sidebar de PrimeReact)*/}
      <MenuMovil />
    </>
  );
};

export default Menu;
