import React, { useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import useContextSesion from "../../hooks/useContextSesion";
import { formatearMoneda } from "../../functions/formatos";
import { ProgressSpinner } from "primereact/progressspinner";
import Boton from "../ui/boton";
import { Link } from "react-router-dom";

const Pedidos = () => {
  const { obtenerDatos, cargando } = useAPI();
  const { sesionIniciada, navegar } = useContextSesion();
  const [pedidos, setPedidos] = useState([]);

  // Protegemos la ruta: Si no hay sesión, le echamos al inicio
  useEffect(() => {
    if (!sesionIniciada) {
      navegar("/login");
      return;
    }

    const cargarHistorial = async () => {
      try {
        // Hacemos el GET al endpoint de Laravel.
        // Como mandamos el Bearer token, Laravel ya sabe de quién son los pedidos.
        const data = await obtenerDatos("pedidos");
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      }
    };

    cargarHistorial();
  }, [sesionIniciada]);

  // ÚNICO RETURN DE LA VISTA
  return (
    <>
      {cargando ? (
        // 1. CASO VERDADERO: Mostramos el spinner mientras carga
        <div className="flex justify-center items-center py-32">
          <ProgressSpinner
            className="spinner-tetra"
            style={{ width: "80px", height: "80px" }}
            strokeWidth="6"
            fill="transparent"
            animationDuration=".5s"
          />
        </div>
      ) : (
        // 2. CASO FALSO: Mostramos el contenido de la página
        <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
            Mi Historial de Pedidos
          </h1>

          {pedidos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <i className="pi pi-box text-6xl text-gray-200 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Aún no has hecho ninguna compra
              </h2>
              <p className="text-gray-500 mb-6">
                Explora nuestro catálogo para encontrar tus productos favoritos.
              </p>
              <Boton
                variante="primario"
                evento={() => navegar("/catalogo")}
                className="px-8 py-3"
              >
                Ir a comprar
              </Boton>
            </div>
          ) : (
            <div className="space-y-6">
              {pedidos.map((pedido) => (
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
                        {new Date(pedido.created_at).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
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
                        <div
                          key={item.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-400">
                              x{item.cantidad}
                            </span>
                            {/* Enlace al producto */}
                            <Link
                              to={`/producto/${item.producto_id}`}
                              className="font-semibold text-gray-700 hover:text-primario hover:underline transition-all"
                            >
                              {item.producto?.nombre ||
                                "Producto descatalogado"}
                            </Link>
                          </div>
                          <span className="text-gray-500 font-medium">
                            {formatearMoneda(item.precio_historico)} / ud
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Pedidos;
