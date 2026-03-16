import React from 'react'
import logoHeader from "../../assets/logoHeader.png";

const Header = () => {
  return (
// Usamos grid también aquí para separar el logo de la navegación
    <header className="bg-primario shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center py-4">
          
          {/* Columna Izquierda: Logo (Ahora es una imagen) */}
          <div className="flex items-center">
            <img 
              src={logoHeader} 
              alt="Logo TetraBIOS" 
              className="h-12 w-auto rounded hover:cursor-pointer shadow-lg" /* h-10 le da un alto fijo y w-auto ajusta el ancho sin deformarla */
            />
          </div>

          {/* Columna Derecha: Navegación */}
          <nav className="flex justify-end items-center space-x-8">
            <a href="#" className="text-white hover:text-terciario font-medium">Catálogo</a>
            <a href="#" className="text-white hover:text-terciario font-medium">Nosotros</a>
            <a href="#" className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-terciario transition">
              Iniciar Sesión
            </a>
          </nav>

        </div>
      </div>
    </header>
  )
}

export default Header
