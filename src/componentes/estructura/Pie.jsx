import React from "react";
import logo_base from "../../assets/logo_base.png";
import { Link } from "react-router-dom";

const Pie = () => {
  return (
    <footer className="bg-secundario text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <div className="flex items-center">
                <Link to="/"> {/* El logo también lleva a la página de inicio. */}
                  <img 
                    src={logo_base} 
                    alt="Logotipo TetraBIOS" 
                    className="h-12 w-auto rounded-md" 
                  />
                </Link>
            </div>
            <p className="text-sm leading-relaxed text-white mt-4">
              Conectando clientes y proveedores de forma directa y segura. 
              Control de stock y gestión de pedidos sin complicaciones ni intermediarios.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {/* He Cambiado <a> por <Link>, para respetar el Single Page Application y no recargar la web. */}
              <li><Link to="/" className="hover:text-terciario transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-terciario transition-colors">Catálogo de Productos</Link></li>
              <li><Link to="/proveedores" className="hover:text-terciario transition-colors">Proveedores</Link></li>
              <li><Link to="/nosotros" className="hover:text-terciario transition-colors">Sobre Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/legal" className="hover:text-terciario transition-colors">Aviso Legal</Link></li>
              <li><Link to="/privacidad" className="hover:text-terciario transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/cookies" className="hover:text-terciario transition-colors">Política de Cookies</Link></li>
              <li><Link to="/terminos" className="hover:text-terciario transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>

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

        <div className="border-t border-white pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Pablo Vidal Ortega - TFG 2DAW. Todos los derechos reservados.
          </p>
          
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-500 transition-colors">
              <i className="pi pi-twitter text-xl"></i>
            </a>
            <a href="https://github.com/PabloVidal-1DAM" target="_blank" rel="noreferrer" className="text-white hover:text-gray-500 transition-colors">
              <i className="pi pi-github text-xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-500 transition-colors">
              <i className="pi pi-linkedin text-xl"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Pie;