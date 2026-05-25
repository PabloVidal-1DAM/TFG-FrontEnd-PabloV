import React from 'react';
import Productos from '../productos/Productos'; 
import useContextProductos from '../../hooks/useContextProductos'; 
import Boton from '../ui/boton';

const Catalogo = () => {
  const { 
    filtros, 
    manejarCambioFiltro, 
    aplicarFiltros, 
    limpiarFiltros,
    listaCategorias // <-- 1. Extraemos las categorías reales del contexto
  } = useContextProductos();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Catálogo Completo</h1>
        <p className="text-gray-500">Encuentra los mejores productos para ti.</p>
      </div>

      <form 
        onSubmit={aplicarFiltros} 
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4 items-end"
      >
        {/* Buscador de texto */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold text-gray-700 mb-1">Buscar por nombre</label>
          <div className="relative">
            <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="busqueda"
              value={filtros.busqueda}
              onChange={manejarCambioFiltro}
              placeholder="Ej. Silla de oficina..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario transition-all"
            />
          </div>
        </div>

        {/* Ordenar Por */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-bold text-gray-700 mb-1">Ordenar por</label>
          <select
            name="orden"
            value={filtros.orden}
            onChange={manejarCambioFiltro}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario transition-all bg-white"
          >
            <option value="">Relevancia</option>
            <option value="precio_asc">Precio: Menor a Mayor</option>
            <option value="precio_desc">Precio: Mayor a Menor</option>
            <option value="nombre_asc">Nombre: A - Z</option>
            <option value="nombre_desc">Nombre: Z - A</option>
          </select>
        </div>

        {/* Categorías Dinámicas */}
        {/* Categorías Agrupadas por Padre */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
          <select
            name="categoria"
            value={filtros.categoria}
            onChange={manejarCambioFiltro}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primario focus:ring-1 focus:ring-primario transition-all bg-white"
          >
            <option value="">Todas</option>
            
            {/* Truco: Agrupamos las categorías por el nombre del padre antes de mapearlas */}
            {Object.entries(
              listaCategorias.reduce((acumulador, categoria) => {
                // Laravel suele devolver las relaciones en snake_case (categoria_padre)
                // Si no tiene padre asignado, lo mandamos a "Otros"
                const nombrePadre = categoria.categoria_padre?.nombre || categoria.categoriaPadre?.nombre || "Otros";
                
                if (!acumulador[nombrePadre]) {
                  acumulador[nombrePadre] = [];
                }
                acumulador[nombrePadre].push(categoria);
                return acumulador;
              }, {})
            ).map(([nombrePadre, subcategorias]) => (
              
              // El <optgroup> crea el título visual no seleccionable
              <optgroup key={nombrePadre} label={nombrePadre}>
                {subcategorias.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.nombre}
                  </option>
                ))}
              </optgroup>
              
            ))}
          </select>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 w-full lg:w-auto">
          <Boton tipo="submit" variante="primario" className="py-2 px-6 flex-1 lg:flex-none justify-center">
            Filtrar
          </Boton>
          <Boton 
            tipo="button" 
            variante="peligro" 
            evento={limpiarFiltros} 
            className="py-2 px-4 justify-center"
            title="Limpiar filtros"
          >
            <i className="pi pi-filter-slash"></i>
          </Boton>
        </div>
      </form>

      <Productos />
    </div>
  );
}

export default Catalogo;