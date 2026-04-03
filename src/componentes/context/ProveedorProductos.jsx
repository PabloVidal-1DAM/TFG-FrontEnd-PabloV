import React, { createContext, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";

const contextoProductos = createContext();
const ProveedorProductos = ({ children }) => {
  const { obtenerDatos, cargando } = useAPI();

  const [listaProductos, setListaProductos] = useState([]);
  // Estados para la paginación:
  const [totalProductos, setTotalProductos] = useState(0);
  const [primerElemento, setPrimerElemento] = useState(0);

  // La función para que acepa un número de página a mostrar (por defecto la 1).
  const cargarProductos = async (pagina = 1) => {
    // Le pasamos el parámetro ?page= al endpoint de Laravel para que sepa que página traer.
    const respuesta = await obtenerDatos(`productos?page=${pagina}`);

    setListaProductos(respuesta.data); // Guarda los 6 productos de la página pasada.
    setTotalProductos(respuesta.total); // Guarda el número total real (ej. 30).
    setPaginaActual(pagina); // Actualiza en qué página se esta en ese momento.
  };

    // Función que se ejecuta cuando el usuario hace clic en los números (1, 2, 3...)
    const alCambiarPagina = (evento) => {
        setPrimerElemento(evento.first);

        // OJO: PrimeReact empieza a contar las páginas desde el 0.
        // Laravel empieza desde el 1. Por eso le sumamos +1.
        cargarProductos(evento.page + 1);
        
        // Opcional: Un pequeño scroll suave hacia arriba al cambiar de página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  useEffect(() => {
    cargarProductos();
  }, []);

  const datos = {
    listaProductos,
    cargando,
    totalProductos,  
    primerElemento,   
    cargarProductos, // El Paginador las usa para llamar a la siguiente página.
    alCambiarPagina
  };

  return (
    <contextoProductos.Provider value={datos}>
      {children}
    </contextoProductos.Provider>
  );
};

export default ProveedorProductos;
export { contextoProductos };
