import { React } from "react";
import { NavLink, Link } from "react-router-dom";
import MenuMovil from "./MenuMovil";

const Menu = () => {
  return (
    <>
      {/* MENÚ DE ESCRITORIO (Oculto en móvil, visible en md)*/}
      <nav className="hidden md:flex justify-end items-center space-x-8">
        <NavLink
          to="/catalogo"
          className={({ isActive }) =>
            isActive
              ? "text-terciario font-bold transition"
              : "text-white hover:text-terciario hover:font-bold transition"
          }
        >
          Catálogo
        </NavLink>

        <NavLink
          to="/nosotros"
          className={({ isActive }) =>
            isActive
              ? "text-terciario font-bold transition"
              : "text-white hover:text-terciario hover:font-bold transition"
          }
        >
          Nosotros
        </NavLink>

        <Link
          to="/login"
          className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-terciario hover:text-primario hover:font-bold transition"
        >
          Iniciar Sesión
        </Link>
      </nav>
      {/*MENÚ LATERAL MÓVIL (He usado el sidebar de PrimeReact)*/}
      <MenuMovil />
    </>
  );
};

export default Menu;
