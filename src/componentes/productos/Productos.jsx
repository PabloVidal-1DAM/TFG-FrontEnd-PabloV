import React from "react";
import useContextProductos from "../hooks/useContextProductos.js";
import Producto from "./Producto.jsx";
import { ProgressSpinner } from "primereact/progressspinner";
import { Paginator } from "primereact/paginator";

const Productos = () => {
  const {
    listaProductos,
    cargando,
    totalProductos,
    primerElemento,
    alCambiarPagina,
  } = useContextProductos();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {cargando ? (
        <div className="flex justify-center items-center py-20">
          <ProgressSpinner
            className="spinner-tetra"
            style={{ width: "80px", height: "80px" }}
            strokeWidth="6"
            fill="transparent"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <>
          {/* Columnas grid con diseño responsive en mente -> md:grid-cols-2 (tablet) y lg:grid-cols-3 (ordenador)*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaProductos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>

          {/* --- Componente paginador de prime react --- */}
          {totalProductos > 0 && (
            <div className="mt-12 flex justify-center">
              <Paginator
                first={primerElemento}
                rows={6} // El mismo número que tengo puesto en Laravel
                totalRecords={totalProductos}
                onPageChange={alCambiarPagina}
                // Personalizo los colores usando el Pass Through (pt)
                pt={{
                  root: { className: "bg-transparent border-none" },
                  pageButton: ({ context }) => ({
                    className: context.active
                      ? "bg-primario text-white rounded-full mx-1"
                      : "text-primario hover:bg-terciario rounded-full mx-1",
                  }),
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Productos;
