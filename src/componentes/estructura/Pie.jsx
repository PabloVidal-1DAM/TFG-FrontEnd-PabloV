import React from "react";
import logo_base from "../../assets/logo_base.png";

const Pie = () => {
  return (
    // Fondo oscuro elegante que contrasta muy bien con tu verde corporativo
    <footer className="bg-secundario text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor Grid: 1 columna en móvil, 2 en tablet, 4 en PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Marca y descripción */}
          <div className="space-y-4">
            {/* 2. Sustituimos el <h2> por la <img> */}
            <div className="flex items-center">
              <img
                src={logo_base}
                alt="Logotipo TetraBIOS"
                className="h-12 w-auto rounded-md" /* h-12 le da una buena altura. rounded-md suaviza los bordes si la imagen es cuadrada. */
              />
            </div>
            <p className="text-sm leading-relaxed text-white">
              Conectando clientes y proveedores de forma directa y segura.
              Control de stock y gestión de pedidos sin complicaciones ni
              intermediarios.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Proveedores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terciario transition-colors">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-center gap-2">
                <i className="pi pi-envelope"></i>
                <span>info@tetrabios.com</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="pi pi-phone"></i>
                <span>+34 900 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="pi pi-map-marker"></i>
                <span>Parque Tecnológico, Edificio 4, Valencia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador y Copyright (Franja inferior) */}
        <div className="border-t border-white pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Pablo Vidal Ortega - TFG 2DAW. Todos
            los derechos reservados.
          </p>

          {/* Redes Sociales usando PrimeIcons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-gray-500 transition-colors"
            >
              <i className="pi pi-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-500 transition-colors"
            >
              <i className="pi pi-github text-xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-500 transition-colors"
            >
              <i className="pi pi-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Pie;
