import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Menu = () => {
  return (
<nav className="flex justify-end items-center space-x-8">
      
      {/* Uso NavLink para los enlaces principales, ya que con su "isActive" si la ruta está activa, el botón se pone verde clarito. */}
      {/*Es por solo estética, Link ya cumple con su función bien.*/}
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
      
      {/* Uso Link normal para el botón de Iniciar Sesion, ya que no necesita cambiar de color al estar activo. */}
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
