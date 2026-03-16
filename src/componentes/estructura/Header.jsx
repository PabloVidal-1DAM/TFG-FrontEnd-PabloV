import React from "react";
import logoHeader from "../../assets/logoHeader.png";
import Menu from "./Menu.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    // Usamos grid también aquí para separar el logo de la navegación
    <header className="bg-primario shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center py-4">
          {/* Columna Izquierda: El logo */}
          <div className="flex items-center">
            <Link to={"/"}>
              <img
                src={logoHeader}
                alt="Logo TetraBIOS"
                className="h-12 w-auto rounded hover:cursor-pointer"
              />
            </Link>
          </div>

          {/* Columna Derecha: Navegación */}
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
