import React, { createContext, useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import useContextSesion from "../../hooks/useContextSesion";

const contextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  const { obtenerDatos, cargando } = useAPI();
  const { ponerMensaje } = useContextSesion();

  const [listaProductos, setListaProductos] = useState([]);
  // 1. NUEVO: Estado para guardar las categorías reales de la BBDD
  const [listaCategorias, setListaCategorias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState({});
  const [productosDestacados, setProductosDestacados] = useState([]);
  
  // Estados para la paginación:
  const [totalProductos, setTotalProductos] = useState(0);
  const [primerElemento, setPrimerElemento] = useState(0);

  // --- 1. NUEVO: ESTADO CENTRALIZADO PARA LOS FILTROS ---
  const [filtros, setFiltros] = useState({
    busqueda: "",
    orden: "",      // "precio_asc", "precio_desc", "nombre_asc", "nombre_desc"
    categoria: "",  // Id de la categoría padre
  });

  // --- 2. MODIFICADO: CARGAR PRODUCTOS ENVIANDO LOS PARÁMETROS A LARAVEL ---
  const cargarProductos = async (pagina = 1) => {
    try {
      // Usamos URLSearchParams nativo para montar la URL limpiamente: ?page=1
      const parametros = new URLSearchParams({ page: pagina });
      
      // Si el usuario ha rellenado algún filtro, lo adjuntamos a la petición
      if (filtros.busqueda) parametros.append("buscar", filtros.busqueda);
      if (filtros.orden) parametros.append("orden", filtros.orden);
      if (filtros.categoria) parametros.append("categoria", filtros.categoria);

      // Ejemplo resultante: productos?page=1&buscar=silla&orden=precio_asc
      const respuesta = await obtenerDatos(`productos?${parametros.toString()}`);

      setListaProductos(respuesta.data); 
      setTotalProductos(respuesta.total); 
    } catch (error) {
      ponerMensaje("error", "Ha ocurrido un error al traer los productos: " + error.message); 
    }
  };

  const cargarDestacados = async () => {
    try {
      const respuesta = await obtenerDatos("productos/destacados");
      setProductosDestacados(respuesta);
    } catch (error) {
      ponerMensaje("error", "Ha ocurrido un error al traer los productos destacados: " + error.message);
    }
  };

  const cargarProductoSeleccionado = async(id) => {
    try {
      const respuesta = await obtenerDatos(`productos/${id}`);
      setProductoSeleccionado(respuesta);
    } catch(error) {
      ponerMensaje("error", "Ha ocurrido un error al traer el producto seleccionado: " + error.message);
    }
  };

  // 2. NUEVO: Función para llamar al nuevo endpoint de Laravel
  const cargarCategorias = async () => {
    try {
      const respuesta = await obtenerDatos("categorias");
      setListaCategorias(respuesta);
    } catch (error) {
      ponerMensaje("error", "Error al cargar las categorías de la base de datos.");
    }
  };

  // El paginador sigue pidiendo la página que toca, pero manteniendo los filtros que estén puestos
  const alCambiarPagina = (evento) => {
    setPrimerElemento(evento.first);
    cargarProductos(evento.page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- 3. NUEVO: LÓGICA PARA ASOCIAR LOS FILTROS CON LOS INPUTS Y SELECTS ---
  const manejarCambioFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const aplicarFiltros = (e) => {
    if (e) e.preventDefault();
    setPrimerElemento(0); // Forzamos a la vista volver visualmente a la página 1
    cargarProductos(1);   // Solicitamos a Laravel la página 1 aplicando los filtros nuevos
  };

  const limpiarFiltros = () => {
    // Reseteamos el estado de los filtros
    const filtrosVacios = { busqueda: "", orden: "", categoria: "" };
    setFiltros(filtrosVacios);
    setPrimerElemento(0);

    // truco de JavaScript: Ejecutamos la carga limpia inmediatamente después de vaciar el estado
    setTimeout(() => {
      cargarProductos(1);
    }, 0);
  };

useEffect(() => {
    cargarDestacados();
    cargarProductos();
    cargarCategorias(); // 3. NUEVO: Lanzamos la petición al arrancar la web
  }, []);

  const datos = {
    listaProductos,
    productosDestacados,
    cargando,
    totalProductos,
    primerElemento,
    cargarProductos, 
    alCambiarPagina,
    cargarProductoSeleccionado, 
    productoSeleccionado,
    filtros,
    manejarCambioFiltro,
    aplicarFiltros,
    limpiarFiltros,
    listaCategorias // 4. NUEVO: Exportamos la lista para que la lea el Catálogo
  };

  return (
    <contextoProductos.Provider value={datos}>
      {children}
    </contextoProductos.Provider>
  );
};

export default ProveedorProductos;
export { contextoProductos };