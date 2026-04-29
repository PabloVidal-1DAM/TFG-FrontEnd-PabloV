import React from "react";
import { Card } from "primereact/card";
import Boton from "../ui/boton";
import { formatearMoneda } from "../../functions/formatos";
import { Rating } from "primereact/rating";
import useContextSesion from "../../hooks/useContextSesion";
import useContextPedidos from "../../hooks/useContextPedidos";

const Producto = ({ producto }) => {
  const urlImagen = `http://localhost:8095/storage/${producto.imagen_url}`;
  const {navegar} = useContextSesion();
  const {agregarAlCarrito} = useContextPedidos();

  // parseFloat convierte "3.5000" a 3.5. Math.round lo redondea a 4 estrellas y si no es 0 en caso de que Laravel devuelva null.
  const mediaEstrellas = Math.round(
    parseFloat(producto.reviews_avg_valoracion) || 0,
  );
  const totalReviews = producto.reviews_count || 0;

  const cabecera = (
    <img
      alt={producto.nombre}
      src={urlImagen}
      onError={(e) => {
        e.target.src =
          "https://i.pinimg.com/736x/1d/ee/d3/1deed3023b8133467193027146da7b83.jpg";
      }}
      className="h-48 w-full object-contain bg-gray-50 rounded-t-lg"
    />
  );

  const pie = (
    <div className="flex justify-between items-center mt-2">
      <span className="text-xl font-bold text-primario">
        {formatearMoneda(producto.precio)}
      </span>

      {/* Dos botones en un div con flex y gap-2 para separarlos un poco */}
      <div className="flex items-center gap-2 mr-2">
        {/* Botón del Ojo (Variante contorno para que sea secundario) */}
        <Boton
          variante="contorno"
          className="py-2 px-3 text-sm hover:cursor-pointer"
          evento={() =>
            navegar(`/producto/${producto.id}`)
          }
        >
          <i className="pi pi-eye text-lg"></i>
        </Boton>

        {/* Botón de Añadir producto al carrito */}
        <Boton variante="primario" className="py-2 px-4 text-sm hover:cursor-pointer" evento={() =>{agregarAlCarrito(producto)}}>
          <i className="pi pi-shopping-cart mr-2"></i> Añadir
        </Boton>
      </div>
    </div>
  );

  return (
    <>
      {/* // El componente de tarjeta de prime react se compone de distintas partes que hay que pasarle para montar su estructura.*/}
      <Card
        title={producto.nombre}
        header={cabecera}
        footer={pie}
        className="h-full w-full flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        pt={{ body: { className: "p-4" }, content: { className: "py-2" } }} // pt permite "pasar a través" del componente y aplicar estilos o atributos a sus partes internas sin usar CSS global.
      >
        {/* Componente de prime react para mostrar el rating de los productos (las estrellas que se suelen ver). */}
        <div className="flex items-center gap-2 mb-3">
          <Rating
            value={mediaEstrellas}
            readOnly // Solo lectura, no se puede votar aquí ni ver el botón para limpiar voto.
            cancel={false} 
            pt={{ onIcon: { className: "text-yellow-400" } }} // Estrellas doradas típicas.
          />
          <span className="text-xs text-gray-500 font-medium mt-1">
            ({totalReviews} opiniones)
          </span>
        </div>

        <p className="m-0 text-gray-600 line-clamp-2 text-sm mb-4">
          {producto.descripcion}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2 border-gray-100">
          <span>📦 Stock: {producto.stock} unidades.</span>

          {producto.categorias && producto.categorias.length > 0 && (
            <span className="bg-secundario text-terciario px-2 py-1 rounded-full font-semibold">
              {producto.categorias[0].nombre}
            </span>
          )}
        </div>
      </Card>
    </>
  );
};

export default Producto;
