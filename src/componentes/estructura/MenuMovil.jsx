import { React, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

const MenuMovil = () => {
  // Estado para controlar si el menú hamburguesa está visible
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      {/* BOTÓN HAMBURGUESA (Visible en móvil, oculto en  tamaño md en adelante).*/}
      <div className="flex md:hidden justify-end">
        <button
          onClick={() => setMenuAbierto(true)}
          className="text-white hover:text-terciario transition p-2 focus:outline-none"
        >
          <i className="pi pi-bars text-3xl"></i>
        </button>
      </div>

      {/* --- 3. MENÚ LATERAL MÓVIL (Sidebar de PrimeReact) --- */}
      <Sidebar
        visible={menuAbierto}
        position="right" // Que salga desde la derecha queda más natural
        onHide={() => setMenuAbierto(false)}
        className="bg-primario text-white w-64" // Estilo corporativo
      >
        <div className="flex flex-col space-y-6 mt-8 text-lg">
          <NavLink
            to="/catalogo"
            onClick={() => setMenuAbierto(false)} // Fundamental: cerrar al hacer click
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
            <Link
              to="/login"
              onClick={() => setMenuAbierto(false)}
              className="bg-terciario text-primario text-center font-bold px-4 py-3 rounded-md hover:bg-white transition block w-full"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default MenuMovil;
