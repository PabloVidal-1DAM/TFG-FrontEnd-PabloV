import React from "react";
import { formatearMoneda } from "../../functions/formatos";
import { Link } from "react-router-dom";
import ItemPedido from "../pedidos/ItemPedido";

// Componente que representa a un pedido dentro de la lista de pedidos, el cual se recorre y se muestra en cambio este componente.
const Pedido = ({ pedido }) => {
  return (
    <div
      key={pedido.id}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Cabecera del pedido */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
            Pedido realizado el
          </p>
          <p className="text-gray-900 font-bold">
            {new Date(pedido.created_at).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col md:text-right">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
            Total pagado
          </p>
          <p className="text-primario font-extrabold text-lg">
            {formatearMoneda(pedido.total)}
          </p>
        </div>

        {/* Etiqueta de estado del pedido */}
        <div>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 
                        ${
                          pedido.estado === "pendiente"
                            ? "bg-orange-100 text-orange-700"
                            : ""
                        }
                        ${
                          pedido.estado === "enviado"
                            ? "bg-blue-100 text-blue-700"
                            : ""
                        }
                        ${
                          pedido.estado === "entregado"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                      `}
          >
            <i
              className={`pi 
                          ${pedido.estado === "pendiente" ? "pi-clock" : ""}
                          ${pedido.estado === "enviado" ? "pi-send" : ""}
                          ${
                            pedido.estado === "entregado"
                              ? "pi-check-circle"
                              : ""
                          }
                        `}
            ></i>
            {pedido.estado}
          </span>
        </div>
      </div>

      {/* Lista de productos comprados en este pedido */}
      <div className="p-6">
        <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">
          Artículos del pedido:
        </h3>
        <div className="space-y-4">
          {pedido.items?.map((item) => (
            <ItemPedido key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pedido;
