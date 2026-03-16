import React from 'react'

const Header = () => {
  return (
// Usamos grid también aquí para separar el logo de la navegación
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center h-16">
          
          {/* Columna Izquierda: Logo */}
          <div className="font-bold text-2xl text-green-700">
            TetraBIOS
          </div>

          {/* Columna Derecha: Navegación */}
          <nav className="flex justify-end space-x-8">
            <a href="#" className="text-gray-600 hover:text-green-700 font-medium">Catálogo</a>
            <a href="#" className="text-gray-600 hover:text-green-700 font-medium">Nosotros</a>
            <a href="#" className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">
              Iniciar Sesión
            </a>
          </nav>

        </div>
      </div>
    </header>
  )
}

export default Header
