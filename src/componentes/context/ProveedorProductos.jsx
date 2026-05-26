import React, { createContext, useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import useContextSesion from "../../hooks/useContextSesion";

const contextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  const { obtenerDatos, cargando } = useAPI();
  const { ponerMensaje } = useContextSesion();

  const [listaProductos, setListaProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState({});
  const [productosDestacados, setProductosDestacados] = useState([]);

  // Estados para la paginación:
  const [totalProductos, setTotalProductos] = useState(0);
  const [primerElemento, setPrimerElemento] = useState(0);

  // Estado para el filtrado que se hará sobre los productos.
  const [filtros, setFiltros] = useState({
    busqueda: "",
    orden: "", // "precio_asc", "precio_desc", "nombre_asc", "nombre_desc"
    categoria: "", // Id de la categoría padre
  });

  // Función para cargar los productos de la B.B.D.D, aceptando parámetros de filtrado,
  // que por defecto si no se pasan solo es el que usa el paginador de laravel para funcionar.
  const cargarProductos = async (pagina = 1, filtrosActuales = filtros) => {
    try {
      // Hago uso de URLSearchParams nativo para montar la URL limpiamente: ?page=1
      const parametros = new URLSearchParams({ page: pagina });

      // Si el usuario ha rellenado algún filtro, añadimos el nuevo parámetro a la petición
      if (filtrosActuales.busqueda)
        parametros.append("buscar", filtros.busqueda);
      if (filtrosActuales.orden) parametros.append("orden", filtros.orden);
      if (filtrosActuales.categoria)
        parametros.append("categoria", filtros.categoria);

      // Ejemplo devuelto: productos?page=1&buscar=silla&orden=precio_asc
      const respuesta = await obtenerDatos(
        `productos?${parametros.toString()}`,
      );

      setListaProductos(respuesta.data);
      setTotalProductos(respuesta.total);
    } catch (error) {
      ponerMensaje(
        "error",
        "Ha ocurrido un error al traer los productos: " + error.message,
      );
    }
  };

  const cargarDestacados = async () => {
    try {
      const respuesta = await obtenerDatos("productos/destacados");
      setProductosDestacados(respuesta);
    } catch (error) {
      ponerMensaje(
        "error",
        "Ha ocurrido un error al traer los productos destacados: " +
          error.message,
      );
    }
  };

  const cargarProductoSeleccionado = async (id) => {
    try {
      const respuesta = await obtenerDatos(`productos/${id}`);
      setProductoSeleccionado(respuesta);
    } catch (error) {
      ponerMensaje(
        "error",
        "Ha ocurrido un error al traer el producto seleccionado: " +
          error.message,
      );
    }
  };

  const cargarCategorias = async () => {
    try {
      const respuesta = await obtenerDatos("categorias");
      setListaCategorias(respuesta);
    } catch (error) {
      ponerMensaje(
        "error",
        "Error al cargar las categorías de la base de datos.",
      );
    }
  };

  useEffect(() => {
    cargarDestacados();
    cargarProductos();
    cargarCategorias();
  }, []);

  // Función que necesita el paginador para pasar a la siguiente página.
  const alCambiarPagina = (evento) => {
    setPrimerElemento(evento.first);
    cargarProductos(evento.page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para actualizar el estado de los filtros del formulario.
  const manejarCambioFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const aplicarFiltros = (e) => {
    if (e) e.preventDefault();
    setPrimerElemento(0); // Forzamos a la vista volver visualmente a la página 1
    cargarProductos(1); // Solicitamos a Laravel la página 1 aplicando los filtros nuevos
  };

  const limpiarFiltros = () => {
    const filtrosVacios = { busqueda: "", orden: "", categoria: "" };

    // Se limpian los filtros que estan actualmente activos
    setFiltros(filtrosVacios);
    setPrimerElemento(0);

    // Y vuelve a hacer la llamada para cargar los productos, esta vez sin parametros.
    cargarProductos(1, filtrosVacios);
  };

  // ¿Por qué la lógica de Reviews está aquí y no en un ProveedorReviews?
  //
  // 1. En nuestra aplicación, las reviews siempre pertenecen a un Producto.
  //    Laravel ya nos inyecta el array de reviews, la media de estrellas y el
  //    contador total DENTRO del objeto 'productoSeleccionado' mediante Eager Loading.
  // 2. Si se creara un estado separado (ej: listaReviews), se tendrían datos
  //    duplicados. Sincronizar la media de estrellas del producto con los cambios
  //    del estado de reviews sería complejo y propenso a bugs de desincronización.
  // 3. Solución limpia y robusta: Hacer la petición a la API (POST/PUT/DELETE)
  //    y, si tiene éxito, se vuelve a llamar a 'cargarProductoSeleccionado(id)'.
  //    Con esto se olbiga a Laravel a recalcular la media en el backend y a
  //    actualizar toda la vista de React en un solo paso, manteniendo todo puro.
  // ==========================================================================

  const crearReview = async (productoId, datosReview) => {
    try {
      // datosReview será un objeto: { valoracion: 5, comentario: "..." }
      // Asegúrate de enviar el producto_id si tu endpoint lo requiere.
      await enviarDatos("reviews", "POST", {
        ...datosReview,
        producto_id: productoId,
      });

      ponerMensaje("success", "¡Gracias por tu opinión!");

      // LA MAGIA: Refrescamos el producto. Esto traerá la nueva review y la nueva media.
      await cargarProductoSeleccionado(productoId);
    } catch (error) {
      ponerMensaje("error", "Error al publicar la reseña: " + error.message);
    }
  };

  const editarReview = async (reviewId, productoId, datosReview) => {
    try {
      await enviarDatos(`reviews/${reviewId}`, "PUT", datosReview);

      ponerMensaje("success", "Reseña actualizada correctamente.");

      // LA MAGIA: Volvemos a traer el producto actualizado
      await cargarProductoSeleccionado(productoId);
    } catch (error) {
      ponerMensaje("error", "Error al actualizar la reseña: " + error.message);
    }
  };

  const eliminarReview = async (reviewId, productoId) => {
    try {
      await enviarDatos(`reviews/${reviewId}`, "DELETE");

      ponerMensaje("success", "Reseña eliminada.");

      // LA MAGIA: Volvemos a traer el producto para que la review desaparezca y baje la media
      await cargarProductoSeleccionado(productoId);
    } catch (error) {
      ponerMensaje("error", "Error al eliminar la reseña: " + error.message);
    }
  };

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
    listaCategorias,
  };

  return (
    <contextoProductos.Provider value={datos}>
      {children}
    </contextoProductos.Provider>
  );
};

export default ProveedorProductos;
export { contextoProductos };
