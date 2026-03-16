import React from "react";
import { Carousel } from "primereact/carousel";
import datosCarousel from "../../assets/contenidoCarrousel.json";
const LandingPage = () => {
  
  // Función que dicta como debe de pintar el componente de primeReact los datos del json
  const bannerTemplate = (banner) => {
    return (
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden mx-2 h-500px md:h-400px h-full flex items-center justify-center shadow-lg">
        <img
          src={banner.imagen}
          alt={banner.titulo}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            {banner.titulo}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-sm">
            {banner.subtitulo}
          </p>
          <button className="bg-primario text-white font-bold mt-4 mb-4 py-3 px-8 rounded-full hover:bg-[#2c5234] shadow-lg transition transform hover:scale-105">
            {banner.textoBoton}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section>
        <Carousel
          value={datosCarousel} // 3. Le pasamos el array que viene directo del JSON
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={5000}
          itemTemplate={bannerTemplate}
          className="custom-carousel"
        />
      </section>

      <section className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Descubre lo que ofrecemos
        </h3>
        <p className="text-gray-600">
          Aquí irá tu componente de productos destacados...
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
