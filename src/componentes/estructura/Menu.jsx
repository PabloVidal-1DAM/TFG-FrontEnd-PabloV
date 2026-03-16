import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Menu = () => {
  return (
<nav className="flex justify-end items-center space-x-8">
      
      {/* Usamos NavLink para los enlaces principales. Si la ruta está activa, se pone verde clarito. */}
      <NavLink 
        to="/catalogo" 
        className={({ isActive }) => 
          isActive 
            ? "text-terciario hover:text-terciario font-bold transition" 
            : "text-white hover:text-terciario hover:font-bold font-medium transition"
        }
      >
        Catálogo
      </NavLink>

      <NavLink 
        to="/nosotros" 
        className={({ isActive }) => 
          isActive 
            ? "text-terciario hover:text-terciario font-bold transition" 
            : "text-white hover:text-terciario hover:font-bold font-medium transition"
        }
      >
        Nosotros
      </NavLink>
      
      {/* Usamos Link normal para el botón, ya que no necesita cambiar de color al estar activo */}
      <Link 
        to="/login" 
        className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-terciario hover:text-primario hover:font-bold transition"
      >
        Iniciar Sesión
      </Link>

    </nav>
  )
}

export default Menu
