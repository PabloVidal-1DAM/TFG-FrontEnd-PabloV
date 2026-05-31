import React, { useEffect } from "react";
import useAPI from "../../hooks/useAPI";
import useContextSesion from "../../hooks/useContextSesion";
import { ProgressSpinner } from "primereact/progressspinner";
import { Paginator } from "primereact/paginator";
import Boton from "../ui/boton";
import useContextPedidos from "../../hooks/useContextPedidos";
import Pedido from "./Pedido";

// Componente que se encarga de mostrar la lista de pedidos hechos del usuario
const Pedidos = () => {
  const { sesionIniciada, navegar } = useContextSesion();

  const {
    historialPedidos,
    cargarPedidosUsuario,
    cargando,
    totalPedidos,
    primerElemento,
    alCambiarPaginaPedido,
  } = useContextPedidos();

  // Se Protege la ruta, si no hay sesión, le echamos al inicio, ya que es una función para los logeados.
  useEffect(() => {
    if (!sesionIniciada) {
      navegar("/login");
      return;
    }

    // Solo se cargan los pedidos si la lista está vacía, evitando llamadas innecesarias a la API si el usuario entra y sale de la pestaña.
    if (historialPedidos.length === 0) {
      cargarPedidosUsuario();
    }
  }, [sesionIniciada]);

  return (
    <>
      {cargando ? (
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
        <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
            Mi Historial de Pedidos
          </h1>

          {historialPedidos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <i className="pi pi-box text-6xl text-gray-200 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Aún no has hecho ninguna compra
              </h2>
              <p className="text-gray-500 mb-6">
                Explora nuestro catálogo para encontrar tus productos favoritos.
              </p>
              <div className="flex justify-center">
                <Boton
                  variante="primario"
                  evento={() => navegar("/catalogo")}
                  className="px-8 py-3 hover:bg-terciario hover:text-primario hover:font-bold transition"
                >
                  Ir a comprar
                </Boton>
              </div>
            </div>
          ) : (
            <>
              {/* Lista de pedidos. */}
              <div className="space-y-6">
                {historialPedidos.map((pedido) => {
                  return <Pedido key={pedido.id} pedido={pedido} />;
                })}
              </div>

              {/* Solo se muestra si hay más pedidos que el límite de 15, que es el número máximo de pedidos por página que se ha configurado en laravel. */}
              {totalPedidos > 15 && (
                <div className="mt-10 flex justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                  <Paginator
                    first={primerElemento}
                    rows={15}
                    totalRecords={totalPedidos}
                    onPageChange={alCambiarPaginaPedido}
                    className="bg-transparent border-none"
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Pedidos;
