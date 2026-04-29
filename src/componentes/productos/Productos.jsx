import React from "react";
import useContextProductos from "../../hooks/useContextProductos.js";
import Producto from "./Producto.jsx";
import { ProgressSpinner } from "primereact/progressspinner";
import Paginador from "../ui/Paginador.jsx";

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
          {listaProductos.length === 0 ? (
            <>
              <p className="text-center text-gray-500">
                ¡VAYA!, no disponemos de productos en este momento...
              </p>
              <Paginador primerElemento={primerElemento} totalElementos={totalProductos} alCambiarPagina={alCambiarPagina} />
            </>
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
                <Paginador primerElemento={primerElemento} totalElementos={totalProductos} alCambiarPagina={alCambiarPagina} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Productos;
