import React from 'react';
import Productos from '../productos/Productos'; 
import useContextProductos from '../../hooks/useContextProductos'; 
import Boton from '../ui/boton';
import FormularioFiltrosProductos from '../formularios/FormularioFiltrosProductos';

// Componente que representa a la página del catalogo dentro de las rutas, donde se podrán ver los productos y añadirles filtrado.
const Catalogo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Catálogo Completo</h1>
        <p className="text-gray-500">Encuentra los mejores productos para ti.</p>
      </div>

      <FormularioFiltrosProductos />

      <Productos />
    </div>
  );
}

export default Catalogo;