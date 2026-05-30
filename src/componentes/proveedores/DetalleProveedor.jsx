import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import Producto from "../productos/Producto";
import Boton from "../ui/boton";
import useContextProveedores from "../../hooks/useContextProveedores";
import useContextSesion from "../../hooks/useContextSesion";

// Componente creado para representar a la ruta dinámica del proveedor que se seleccione en el componente Proveedor.
const DetalleProveedor = () => {
  const { id } = useParams(); // Captura el id dinámico de la URL

  // Extraemos los estados y funciones del proveedor de contexto de la entidad
  const { proveedorSeleccionado, cargarDetalle, cargando } =
    useContextProveedores();
  const { navegar, sesionIniciada } = useContextSesion();

  useEffect(() => {
    // Si hay sesion iniciada le pasamos el ID de la URL a la lógica centralizada del proveedor
    if (sesionIniciada) {
      cargarDetalle(id);
    } else {
      // Si un usuario se logra colar aquí sin cuenta, se le manda al inicio de la página.
      navegar("/proveedores");
    }
  }, [id]);

  // Si está cargando la API o el estado global aún no tiene los datos del proveedor concreto
  if (cargando || !proveedorSeleccionado) {
    return (
      <div className="flex justify-center items-center py-32">
        <ProgressSpinner
          className="spinner-tetra"
          style={{ width: "80px", height: "80px" }}
          strokeWidth="6"
          fill="transparent"
          animationDuration=".5s"
        />
      </div>
    );
  }

  // Se guardan los productos que provee el Proveedor para recorrerlos y mostrarlos más adelante.
  const productosOferta = proveedorSeleccionado.productos || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Botón para volver atrás */}
      <Boton
        variante="contorno"
        className="mb-8 py-2 px-4 text-sm hover:cursor-pointer flex items-center gap-2"
        evento={() => navegar("/proveedores")}
      >
        <i className="pi pi-arrow-left"></i> Volver a Proveedores
      </Boton>

      {/* Cabecera del Detalle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
        <div>
          <span className="text-xs font-bold text-terciario uppercase tracking-wider bg-secundario px-3 py-1 rounded-full">
            Proveedor Oficial
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-1">
            {proveedorSeleccionado.nombre}
          </h1>
          <p className="text-sm font-semibold text-gray-400">
            CIF: {proveedorSeleccionado.cif}
          </p>
        </div>

        {/* Datos de contacto organizados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-2">
            <i className="pi pi-envelope text-primario"></i>
            <a
              href={`mailto:${proveedorSeleccionado.email}`}
              className="hover:underline truncate"
            >
              {proveedorSeleccionado.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <i className="pi pi-phone text-primario"></i>
            <span>{proveedorSeleccionado.telefono}</span>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <i className="pi pi-map-marker text-primario mt-0.5"></i>
            <span className="line-clamp-2">
              {proveedorSeleccionado.direccion}
            </span>
          </div>
        </div>
      </div>

      {/* Sección de productos ofertados */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Catálogo Ofertado por este Proveedor ({productosOferta.length})
        </h2>

        {productosOferta.length === 0 ? (
          <p className="text-gray-500 text-center py-12 bg-gray-50 rounded-xl border border-dashed">
            Este proveedor aún no tiene productos vinculados en el catálogo
            público.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosOferta.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleProveedor;
