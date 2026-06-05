import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar'; 
import { enlacesAdmin } from '../../utils/rutasPanelAdmin';
import useContextSesion from '../../hooks/useContextSesion';

const PanelAdmin = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuario, sesionIniciada, navegar } = useContextSesion();

  // Se comprueba si de entre los roles del usuario, existe uno llamado 'admin'
  const esAdmin = usuario?.roles?.some(rol => rol.name === 'admin');

  // Al cargar el componente se comprueba que el usuario no tenga sesión y que tenga pero no sea admin.
  useEffect(() => {
    if (!sesionIniciada || !esAdmin) {
      navegar("/", { replace: true }); // replace evita que usen el botón 'Atrás' para volver
    }
  }, [sesionIniciada, esAdmin, navegar]);

  // Plantilla personalizada de sidebar que puedes pasarle al componente Sidebar de prime react para usar estilos propios.
  const contenidoMenu = (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="h-16 flex items-center justify-center px-6 bg-gray-950 border-b border-gray-800">
        <span className="text-xl font-extrabold tracking-wider text-primario">
          Tetra<span className="text-white">ADMIN</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {enlacesAdmin.map((enlace) => (
          <NavLink
            key={enlace.ruta}
            to={enlace.ruta}
            end={enlace.exacto}
            onClick={() => setMenuAbierto(false)} 
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                isActive
                  ? 'bg-gray-800 border-primario text-white'
                  : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-100 hover:border-gray-600'
              }`
            }
          >
            <i className={`${enlace.icono} mr-3 text-lg`}></i>
            {enlace.texto}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link 
          to="/" 
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primario rounded-md hover:bg-terciario hover:text-primario transition-colors"
        >
          <i className="pi pi-external-link mr-2"></i>
          Ir a la tienda
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Si no es admin, se renderiza una pantalla de carga ocupando toda la pantalla para no revelar información.
        Si es admin, se ve el panel completo. 
      */}
      {!esAdmin ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <i className="pi pi-spin pi-spinner text-primario text-5xl mb-4"></i>
            <p className="text-gray-500 font-medium">Verificando credenciales de seguridad...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex bg-gray-100">
          <aside className="hidden md:flex w-64 flex-shrink-0 flex-col fixed inset-y-0 left-0 z-50">
            {contenidoMenu}
          </aside>

          <Sidebar 
            visible={menuAbierto} 
            onHide={() => setMenuAbierto(false)} 
            className="p-0 bg-gray-900 border-none w-64" 
            showCloseIcon={false} 
          >
            {contenidoMenu}
          </Sidebar>

          <main className="flex-1 flex flex-col md:ml-64 min-h-screen w-full">
            <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
              <button 
                className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setMenuAbierto(true)}
              >
                <i className="pi pi-bars text-2xl"></i>
              </button>
              
              <div className="ml-auto flex items-center">
                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <i className="pi pi-shield mr-2 text-primario"></i>
                  Modo Administrador
                </span>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default PanelAdmin;