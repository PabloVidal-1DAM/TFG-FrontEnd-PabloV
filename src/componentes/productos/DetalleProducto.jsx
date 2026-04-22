import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContextProductos from "../hooks/useContextProductos.js";
import { formatearMoneda } from "../functions/formatos.js";
import Boton from "../ui/boton";
import { ProgressSpinner } from "primereact/progressspinner";
import ReviewsProducto from "./ReviewsProducto.jsx";
import { Rating } from "primereact/rating";
import useContextPedidos from "../hooks/useContextPedidos.js"

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { agregarAlCarrito } = useContextPedidos();

  const { productoSeleccionado, cargarProductoSeleccionado, cargando } =
    useContextProductos();

  useEffect(() => {
    cargarProductoSeleccionado(id);
    window.scrollTo(0, 0);
  }, [id]);

  if (cargando || !productoSeleccionado || !productoSeleccionado.id) {
    return (
      <div className="flex justify-center items-center py-32">
        <ProgressSpinner
          className="spinner-tetra"
          strokeWidth="6"
          fill="transparent"
        />
      </div>
    );
  }

  const producto = productoSeleccionado;

  // Calculamos la media para mostrarla en la cabecera del detalle si queremos
  const mediaEstrellas = Math.round(
    parseFloat(producto.reviews_avg_valoracion) || 0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-gray-500 hover:text-primario transition-colors font-semibold"
      >
        <i className="pi pi-arrow-left mr-2"></i> Volver al catálogo
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm mb-12">
        {/* Lado Izquierdo: Imagen */}
        <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-8">
          <img
            src={`http://localhost:8095/storage/${producto.imagen_url}`}
            alt={producto.nombre}
            onError={(e) => {
              e.target.src =
                "https://i.pinimg.com/736x/1d/ee/d3/1deed3023b8133467193027146da7b83.jpg";
            }}
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>

        {/* Lado Derecho: Detalles */}
        <div className="flex flex-col justify-center">
          <div className="flex gap-2 mb-4">
            {producto.categorias &&
              producto.categorias.map((cat) => (
                <span
                  key={cat.id}
                  className="bg-secundario text-terciario px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {cat.nombre}
                </span>
              ))}
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {producto.nombre}
          </h1>

          {/* Media de estrellas rápida debajo del título */}
          <div className="flex items-center gap-2 mb-4">
            <Rating
              value={mediaEstrellas}
              readOnly
              cancel={false}
              pt={{ onIcon: { className: "text-yellow-400" } }}
            />
            <span className="text-sm text-gray-500">
              ({producto.reviews_count} opiniones)
            </span>
          </div>

          {producto.proveedor && (
            <p className="text-gray-500 font-medium mb-4">
              Vendido por:{" "}
              <span className="text-primario font-bold">
                {producto.proveedor.nombre}
              </span>
            </p>
          )}

          <p className="text-3xl text-primario font-bold mb-6">
            {formatearMoneda(producto.precio)}
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-terciario pl-4">
            {producto.descripcion}
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-8 inline-block w-max">
            <span className="text-gray-700 font-medium">
              📦 Disponibilidad:{" "}
            </span>
            <span
              className={
                producto.stock > 0
                  ? "text-green-700 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {producto.stock} unidades en stock
            </span>
          </div>

          <div className="flex gap-4">
            <Boton
              variante="primario"
              className="py-3 px-8 text-lg w-full md:w-auto hover:cursor-pointer"
              evento={() =>{agregarAlCarrito(producto)}}
            >
              <i className="pi pi-shopping-cart mr-2"></i> Añadir al carrito
            </Boton>
          </div>
        </div>
      </div>
      {/*La parte final es la sección para ver las reviews que dejan los usuarios a los productos */}
      <ReviewsProducto producto={producto} />
    </div>
  );
};

export default DetalleProducto;
