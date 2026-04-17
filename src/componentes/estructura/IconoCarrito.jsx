import React from "react";

const IconoCarrito = ({totalArticulos}) => {
  return (
    <>
      {/* El icono del carrito con su burbuja de notificaciones que dice cuantos productos contiene. */}
      <div className="relative cursor-pointer text-white hover:text-terciario transition-colors">
        <i className="pi pi-shopping-cart text-2xl"></i>

        {/* Si hay más de 0 artículos, pintamos la burbuja roja encima */}
        {totalArticulos > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalArticulos}
          </span>
        )}
      </div>
    </>
  );
};

export default IconoCarrito;
