import React from "react";
import { formatearMoneda } from "../functions/formatos";
import Boton from "../ui/boton";
import useContextPedidos from "../hooks/useContextPedidos";

const ResumenCarrito = () => {
  const { vaciarCarrito, precioTotal } = useContextPedidos();

  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-sm h-fit sticky top-24 border border-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Resumen del pedido
        </h2>

        <div className="flex justify-between items-center mb-8 border-t border-gray-100 pt-6">
          <span className="font-medium text-gray-500 text-lg">
            Total a pagar:
          </span>
          <span className="font-extrabold text-primario text-3xl">
            {formatearMoneda(precioTotal)}
          </span>
        </div>

        <Boton
          variante="primario"
          className="w-full py-4 text-lg mb-4 font-bold shadow-lg shadow-primario/30 hover:cursor-pointer"
        >
          Completar Pedido <i className="pi pi-arrow-right ml-2"></i>
        </Boton>

        {/* Botón Vaciar Carrito Entero */}
        <button
          onClick={vaciarCarrito}
          className="w-full py-3 text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center gap-2 font-medium mt-4 rounded-lg hover:bg-red-50 hover:cursor-pointer"
        >
          <i className="pi pi-trash"></i> Vaciar todo el carrito
        </button>
      </div>
    </>
  );
};

export default ResumenCarrito;
