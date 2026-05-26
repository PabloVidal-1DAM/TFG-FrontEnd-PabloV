import React from "react";

// Componente que representa para mostrar a una subcatgeoría y a la categoría padre de un producto que lo hereda.
const Categoria = ({ categoria }) => {
  const padre = categoria.categoria_padre || categoria.categoriaPadre;

  return (
    <div key={categoria.id} className="flex items-center gap-2 text-sm">
      {/* Si tiene categoría padre, se pinta con un estilo más sobrio */}
      {padre && (
        <>
          <span className="text-gray-400 font-semibold uppercase tracking-wider text-xs">
            {padre.nombre}
          </span>
          <i className="pi pi-angle-right text-gray-300 text-xs mt-0.5"></i>
        </>
      )}
      {/*Estilos corporativos definidos en index.css */}
      <span className="bg-secundario text-terciario px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
        {categoria.nombre}
      </span>
    </div>
  );
};

export default Categoria;
