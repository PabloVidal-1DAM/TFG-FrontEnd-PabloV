import React from "react";
import { useNavigate } from "react-router-dom";
import useContextPedidos from "../hooks/useContextPedidos";
import Boton from "../ui/boton";
import useContextSesion from "../hooks/useContextSesion";
import ItemCarrito from "./ItemCarrito";
import ResumenCarrito from "./ResumenCarrito";

const Carrito = () => {
  const { carritoCompra } = useContextPedidos();

  const { navegar } = useContextSesion();

  return (
    <>
      {carritoCompra.length === 0 ? (
        // 1. Si el carrito está vacío.
        <div className="max-w-3xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
          <i className="pi pi-shopping-cart text-6xl text-gray-200 mb-6"></i>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 mb-8">
            ¡Anímate a explorar nuestro catálogo y descubre productos
            increíbles!
          </p>
          <Boton
            variante="primario"
            evento={() => navegar("/catalogo")}
            className="px-8 py-3 hover:cursor-pointer"
          >
            Volver al catálogo
          </Boton>
        </div>
      ) : (
        // 2. Si existen items en el carrito.
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            Tu Cesta de Compra
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Lado Izquierdo: Lista de Productos */}
            <div className="lg:col-span-2 space-y-6">
              {carritoCompra.map((item) => (
                <ItemCarrito key={item.id} item={item} />
              ))}
            </div>

            {/* Lado Derecho: Resumen y Totales */}
            <ResumenCarrito />
          </div>
        </div>
      )}
    </>
  );
};

export default Carrito;
