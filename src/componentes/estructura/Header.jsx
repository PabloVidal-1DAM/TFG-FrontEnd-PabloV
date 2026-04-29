import React from "react";
import useContextPedidos from "../../hooks/useContextPedidos.js";
import logoHeader from "../../assets/logoHeader.png";
import logoMovil from "../../assets/logoMovil.png";
import Menu from "./Menu.jsx";
import { Link } from "react-router-dom";
import IconoCarrito from "./IconoCarrito.jsx";

const Header = () => {
  const { totalArticulos } = useContextPedidos();

  return (
    // Uso grid aquí para separar el logo de la navegación en 2 columnas.
    <header className="bg-primario shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center py-4">
          {/* Columna Izquierda: El logo */}
          <div className="flex items-center">
            <Link to={"/"}>
              {/*Logo para el tamaño en móvil, así no rompe la cabecera.*/}
              <img
                src={logoMovil}
                alt="Icono TetraBIOS"
                className="h-20 w-auto object-contain min-[460px]:hidden"
              />
              {/*Logo que se mostrará en el resto de tamaños.*/}
              <img
                src={logoHeader}
                alt="Logo TetraBIOS"
                className="hidden min-[460px]:block h-12 w-auto rounded hover:cursor-pointer"
              />
            </Link>
          </div>

          {/* Columna Derecha: Navegación Y Carrito agrupados */}
          {/* Usamos flex y justify-end para pegarlos a la derecha, y gap-6 para separarlos un poco */}
          <div className="flex items-center justify-end gap-6">
            <Menu />
            <Link to={"/carrito"}>
              <IconoCarrito totalArticulos={totalArticulos} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
