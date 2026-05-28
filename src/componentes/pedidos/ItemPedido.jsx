import React from "react";
import { Link } from "react-router-dom"; 
import { formatearMoneda } from "../../functions/formatos";

 // Componente que se encarga exclusivamente de renderizar una línea de producto dentro de un pedido. 
const ItemPedido = ({ item }) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-400">x{item.cantidad}</span>
        {/* Enlace al producto */}
        <Link
          to={`/producto/${item.producto_id}`}
          className="font-semibold text-gray-700 hover:text-primario hover:underline transition-all"
        >
          {item.producto?.nombre || "Producto descatalogado"}
        </Link>
      </div>
      <span className="text-gray-500 font-medium">
        {formatearMoneda(item.precio_historico)} / ud
      </span>
    </div>
  );
};

export default ItemPedido;
