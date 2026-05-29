import React from "react";
import Boton from "../ui/boton";
import { useNavigate } from "react-router-dom";
import imagenNosotros from "../../assets/imagenNosotros.png"
import imagenDivNosotros from "../../assets/imagenDivNosotros.png"

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Sección Hero: Introducción de la empresa */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Revolucionando el <span className="text-primario">packaging B2B</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            En <strong>TetraBIOS</strong> creemos que el futuro del comercio y la distribución pasa inevitablemente por la sostenibilidad. Nacimos con una misión clara: ofrecer a las empresas alternativas de embalaje y envases de alta calidad, fabricados al 100% a partir de cartón ecológico y TetraBriks reciclados.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sin intermediarios. Sin plásticos innecesarios. Conectamos directamente a los mejores proveedores de materiales sostenibles con negocios que quieren marcar la diferencia.
          </p>
          <div className="pt-4">
            <Boton 
              variante="primario" 
              className="py-3 px-8 text-lg rounded-full hover:scale-105 transition-transform"
              evento={() => navigate("/catalogo")}
            >
              <i className="pi pi-box mr-2"></i> Ver nuestro catálogo
            </Boton>
          </div>
        </div>
        
        {/* Imagen representativa */}
        <div className="flex-1 w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-[450px]">
            <img 
              src={imagenNosotros} 
              alt="Cartón reciclado y naturaleza" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Sección de Valores (Grid de 3 columnas) */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Nuestros Pilares</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Trabajamos cada día para asegurar que cada producto que sale de nuestros almacenes cumple con los más altos estándares ecológicos y logísticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Pilar 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-50 text-center flex flex-col items-center">
            <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              {/* CAMBIO AQUÍ: SVG nativo de una hoja para asegurar que se vea perfecto */}
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">100% Ecológico</h3>
            <p className="text-gray-600 text-sm">
              Todos nuestros envases y complementos provienen de bosques certificados FSC o de procesos de reciclaje de TetraBriks.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-50 text-center flex flex-col items-center">
            <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <i className="pi pi-building text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Enfoque B2B</h3>
            <p className="text-gray-600 text-sm">
              Diseñamos nuestra logística pensando en volúmenes de empresa. Precios transparentes, facturación clara y envíos paletizados seguros.
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-50 text-center flex flex-col items-center">
            <div className="bg-orange-100 text-orange-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <i className="pi pi-truck text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Gestión de Stock</h3>
            <p className="text-gray-600 text-sm">
              Nuestra plataforma te garantiza información de stock en tiempo real. Si lo ves disponible, lo tenemos listo para enviar.
            </p>
          </div>
        </div>
      </section>

      {/* Sección CTA Final */}
      <section className="bg-gray-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
        
        {/* CAMBIO AQUÍ: La nueva imagen de fondo */}
        <img 
          src={imagenDivNosotros} 
          alt="Fondo ecológico" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        {/* Decoración de luz (Se mantiene para darle el toque moderno) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-primario opacity-10 blur-3xl"></div>
        
        {/* Es importante mantener el z-10 para que el texto quede por encima de la imagen */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            ¿Listo para dar el salto verde en tu negocio?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Únete a cientos de empresas que ya han reducido su huella de carbono confiando en los embalajes de TetraBIOS. Crea tu cuenta de cliente hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Boton 
              variante="primario" 
              className="py-3 px-8 font-bold text-lg rounded-full"
              evento={() => navigate("/signup")}
            >
              Registrarse ahora
            </Boton>
            <Boton 
              variante="contorno" 
              className="py-3 px-8 font-bold text-lg rounded-full text-white border-white hover:bg-white hover:text-gray-900"
              evento={() => navigate("/login")}
            >
              Ya tengo cuenta
            </Boton>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Nosotros;