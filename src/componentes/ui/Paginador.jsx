import React from "react";
import { Paginator } from "primereact/paginator";

// Este componente se ha creado al observar que se tenía que repetir la misma lógica visual del paginador en el proyecto, para acortar código.
const Paginador = ({primerElemento, totalElementos, alCambiarPagina}) => {
  return (
    <>
      <div className="mt-12 flex justify-center">
        <Paginator
          first={primerElemento}
          rows={6} // El mismo número que tengo puesto en Laravel
          totalRecords={totalElementos}
          onPageChange={alCambiarPagina}
          // Personalizo los colores usando el Pass Through (pt)
          pt={{
            root: { className: "bg-transparent border-none" },
            pageButton: ({ context }) => ({
              className: context.active
                ? "bg-primario text-white rounded-full mx-1"
                : "text-primario hover:bg-terciario rounded-full mx-1",
            }),
          }}
        />
      </div>
    </>
  );
};

export default Paginador;
