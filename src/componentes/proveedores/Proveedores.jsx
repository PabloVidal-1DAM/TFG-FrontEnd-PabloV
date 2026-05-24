import React from "react";
import useContextProveedores from "../../hooks/useContextProveedores";
import Proveedor from "./Proveedor";
import { ProgressSpinner } from "primereact/progressspinner";
import Paginador from "../ui/Paginador";
import useContextSesion from "../../hooks/useContextSesion";
import { Link } from "react-router-dom";
import AccesoRestringido from "../ui/AccesoRestringido";

const Proveedores = () => {
  const {
    listaProveedores,
    cargando,
    totalProveedores,
    primerElemento,
    alCambiarPagina,
  } = useContextProveedores();

  const { sesionIniciada } = useContextSesion();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* --- EL CONDICIONAL MAGNO --- */}
      {sesionIniciada ? (
        // SI HAY SESIÓN: Mostramos el contenido de siempre
        cargando ? (
          <div className="flex justify-center items-center py-20">
            <ProgressSpinner
              className="spinner-tetra"
              style={{ width: "80px", height: "80px" }}
              strokeWidth="6"
              fill="transparent"
              animationDuration=".5s"
            />
          </div>
        ) : (
          <>
            {listaProveedores.length === 0 ? (
              <>
                <p className="text-center text-gray-500 text-lg py-10">
                  ¡VAYA!, no disponemos de proveedores en este momento...
                </p>
                <Paginador
                  primerElemento={primerElemento}
                  totalElementos={totalProveedores}
                  alCambiarPagina={alCambiarPagina}
                />
              </>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Nuestros Proveedores
                  </h1>
                  <p className="text-lg text-gray-500">
                    Conoce a las empresas de confianza que suministran nuestro
                    catálogo.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {listaProveedores.map((proveedor) => (
                    <Proveedor key={proveedor.id} proveedor={proveedor} />
                  ))}
                </div>

                {totalProveedores > 0 && (
                  <div className="mt-10">
                    <Paginador
                      primerElemento={primerElemento}
                      totalElementos={totalProveedores}
                      alCambiarPagina={alCambiarPagina}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )
      ) : (
        // SI NO HAY SESIÓN: Mostramos un mensaje de acceso restringido
        <AccesoRestringido
          motivo="Por motivos de privacidad, la lista de proveedores solo está disponible para usuarios registrados." 
        />
      )}
    </div>
  );
};

export default Proveedores;
