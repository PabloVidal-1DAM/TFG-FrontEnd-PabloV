import React from "react";
import { Carousel } from "primereact/carousel";
import datosCarousel from "../../assets/contenidoCarrousel.json";
import Boton from "../ui/boton";
import Producto from "../productos/Producto.jsx";
import useContextProductos from "../../hooks/useContextProductos.js";
const LandingPage = () => {

  const {productosDestacados} = useContextProductos();
  
  // Función que dicta como debe de pintar el componente de primeReact los datos del json
  const plantillaCarrousel = (diapositiva) => {
    return (
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden mx-2 h-[500px] md:h-[400px] flex items-center justify-center shadow-lg">
        <img
          src={diapositiva.imagen}
          alt={diapositiva.titulo}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            {diapositiva.titulo}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-sm">
            {diapositiva.subtitulo}
          </p>
          <Boton variante="primario" className="py-3 px-8 rounded-full transform mb-4 hover:scale-105 text-lg">
            {diapositiva.textoBoton}
          </Boton>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section>
        {/*Componente ya hecho de la libería prime react para el carrousel de mi landing page, gasta los siguientes props:*/}
        <Carousel
          value={datosCarousel} // Se le pasa el array que viene directo del JSON para que lo recorra internamente.
          numVisible={1} // Número de imágenes mostradas.
          numScroll={1} // Número de saltos de imagen al desplazarse por el carrousel.
          circular // La transición entre imágenes se gestiona sola.
          autoplayInterval={5000} // Intervalo entre salto y salto de imagen automático.
          itemTemplate={plantillaCarrousel} // Plantilla en la que se va a basar para pintarlo.
          className="custom-carousel"
        />
      </section>

      {/* Sección para los productos destacados: */}
      <section className="py-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Nuestros Top Ventas
        </h3>
        
        {/* Se crea un grid de 3 cols para que se vean bien. */}
        {productosDestacados && productosDestacados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productosDestacados.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">¡VAYA!, no disponemos de productos destacados en este momento...</p>
        )}
      </section>
    </div>
  );
};

export default LandingPage;
