import React, { createContext, useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";

const contextoProductos = createContext();
const ProveedorProductos = ({ children }) => {
  const { obtenerDatos, cargando } = useAPI();

  const [listaProductos, setListaProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState({});
  const [productosDestacados, setProductosDestacados] = useState([]);
  // Estados para la paginación:
  const [totalProductos, setTotalProductos] = useState(0);
  const [primerElemento, setPrimerElemento] = useState(0);

  // La función para que acepa un número de página a mostrar (por defecto la 1).
  const cargarProductos = async (pagina = 1) => {
    try {
      // Le pasamos el parámetro ?page= al endpoint de Laravel para que sepa que página traer.
      const respuesta = await obtenerDatos(`productos?page=${pagina}`);

      setListaProductos(respuesta.data); // Guarda los 6 productos de la página pasada.
      setTotalProductos(respuesta.total); // Guarda el número total real (ej. 30).
    } catch (error) {
      console.log("Ha ocurrido un error al traer los productos: " + error); // cambiar cuando se tenga el setError
    }
  };
  // Función para traer los productos destacados de la bbdd, basado en los que más están en los pedidos de la gente.
  const cargarDestacados = async () => {
    try {
      const respuesta = await obtenerDatos("productos/destacados");
      setProductosDestacados(respuesta);
    } catch (error) {
      console.log("Ha ocurrido un error al traer los productos destacados: " + error);
    }
  };

  const cargarProductoSeleccionado = async(id) =>{
    try{
      const respuesta = await obtenerDatos(`productos/${id}`);
      setProductoSeleccionado(respuesta);
    }catch(error){
      console.log("Ha ocurrido un error al traer el producto seleccionado: " + error);
    }
  }

  // Función que se ejecuta cuando el usuario hace clic en los números para pasar de página.
  const alCambiarPagina = (evento) => {
    setPrimerElemento(evento.first);

    // OJO: PrimeReact empieza a contar las páginas desde el 0.
    // Laravel empieza desde el 1. Por eso le sumo +1.
    cargarProductos(evento.page + 1);

    // Efecto de un pequeño scroll suave hacia arriba al cambiar de página para no quedarse abajo y perderse información.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    cargarDestacados();
    cargarProductos();
  }, []);

  const datos = {
    listaProductos,
    productosDestacados,
    cargando,
    totalProductos,
    primerElemento,
    cargarProductos, // El Paginador las usa para llamar a la siguiente página.
    alCambiarPagina,
    cargarProductoSeleccionado, // Cuando el usuario seleccione un producto del catálogo.
    productoSeleccionado
  };

  return (
    <contextoProductos.Provider value={datos}>
      {children}
    </contextoProductos.Provider>
  );
};

export default ProveedorProductos;
export { contextoProductos };
