import React from "react";
import useContextProductos from "../hooks/useContextProductos.js";
import Producto from "./Producto.jsx";
import { ProgressSpinner } from "primereact/progressspinner";

const Productos = () => {
  const { listaProductos, cargando } = useContextProductos();

  return (
    <>
      {cargando ? (
        <ProgressSpinner
          className="spinner-tetra" 
          style={{ width: "80px", height: "80px" }}
          strokeWidth="6"
          fill="transparent"
          animationDuration=".5s"
        />
      ) : (
        listaProductos.map((producto) => <Producto key={producto.id} producto={producto} />)
      )}
    </>
  );
};

export default Productos;
