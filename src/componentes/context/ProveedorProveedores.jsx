import React, { createContext, useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import useContextSesion from "../../hooks/useContextSesion";

const contextoProveedores = createContext();
const ProveedorProveedores = ({ children }) => {
  const { cargando, obtenerDatos } = useAPI();
  const { ponerMensaje } = useContextSesion();

  const [listaProveedores, setListaProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState([]);

  // Función que trae todos los proveedores y acepa un número de página a mostrar de la paginación (por defecto la 1).
  const cargarProveedores = async (pagina = 1) => {
    try {
      // Laravel necesita el parametro ?page para saber que página mostrar del paginado.
      const respuesta = await obtenerDatos(`proveedores?page=${pagina}`);
      setListaProveedores(respuesta);
    } catch (error) {
      ponerMensaje("Ha ocurrido un error al traer los productos: " + error);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  // Función que se ejecuta cuando el usuario hace clic en los números para pasar de página.
  const alCambiarPagina = (evento) => {
    setPrimerElemento(evento.first);

    // OJO: PrimeReact empieza a contar las páginas desde el 0.
    // Laravel empieza desde el 1. Por eso le sumo +1.
    cargarProductos(evento.page + 1);

    // Efecto de un pequeño scroll suave hacia arriba al cambiar de página para no quedarse abajo y perderse información.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const datos = {};
  return (
    <contextoProveedor.Provider value={datos}>
      {children}
    </contextoProveedor.Provider>
  );
};

export default ProveedorProveedores;
export { contextoProveedores };
