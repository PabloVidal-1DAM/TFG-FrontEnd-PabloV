import React from "react";
import { formatearMoneda } from "../functions/formatos";
import useContextPedidos from "../hooks/useContextPedidos";

const ItemCarrito = ({ item }) => {
  const {
    agregarAlCarrito, disminuirCantidad, eliminarDelCarrito
  } = useContextPedidos();
  
  return (
    <>
      <div
        key={item.id}
        className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-xl shadow-sm"
      >
        {/* Imagen */}
        <img
          src={`http://localhost:8095/storage/${item.imagen_url}`}
          alt={item.nombre}
          onError={(e) => {
            e.target.src =
              "https://i.pinimg.com/736x/1d/ee/d3/1deed3023b8133467193027146da7b83.jpg";
          }}
          className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-2"
        />

        {/* Datos del producto */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
            {item.nombre}
          </h3>
          <p className="text-primario font-extrabold text-xl">
            {formatearMoneda(item.precio)}
          </p>
        </div>

        {/* Controles de Cantidad (+ y -) */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
          <button
            onClick={() => disminuirCantidad(item.id)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primario hover:bg-white rounded-full transition-all shadow-sm"
          >
            <i className="pi pi-minus text-xs"></i>
          </button>
          <span className="font-bold w-6 text-center select-none">
            {item.cantidad}
          </span>
          <button
            onClick={() => agregarAlCarrito(item)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primario hover:bg-white rounded-full transition-all shadow-sm"
          >
            <i className="pi pi-plus text-xs"></i>
          </button>
        </div>

        {/* Botón Borrar Línea */}
        <button
          onClick={() => eliminarDelCarrito(item.id)}
          className="text-gray-300 hover:text-red-500 p-2 transition-colors ml-2"
          title="Eliminar producto"
        >
          <i className="pi pi-trash text-xl"></i>
        </button>
      </div>
    </>
  );
};

export default ItemCarrito;
