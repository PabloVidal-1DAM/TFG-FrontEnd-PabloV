import React from "react";
import { Card } from "primereact/card";
import useContextSesion from "../../hooks/useContextSesion";

const Proveedor = ({ proveedor }) => {
  const { navegar } = useContextSesion();

  // Cabecera de la tarjeta: Franja verde corporativa con un icono
  const cabecera = (
    <div className="bg-primario h-24 rounded-t-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-terciario">
      <i className="pi pi-building text-white text-4xl transition-colors duration-300 group-hover:text-primario"></i>
    </div>
  );

  return (
    <Card
      title={proveedor.nombre}
      subTitle={`CIF: ${proveedor.cif}`}
      header={cabecera}
      onClick={() => navegar(`/proveedor/${proveedor.id}`)}
      className="group h-full w-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      pt={{ body: { className: "p-4 flex-grow" }, content: { className: "py-2" } }}
    >
      <div className="space-y-4 text-sm text-gray-600 mt-2">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="bg-green-50 p-2 rounded-full flex shrink-0">
            <i className="pi pi-envelope text-terciario"></i>
          </div>
          <a href={`mailto:${proveedor.email}`} className="hover:text-primario font-medium truncate">
            {proveedor.email}
          </a>
        </div>
        
        {/* Teléfono */}
        <div className="flex items-center gap-3">
          <div className="bg-green-50 p-2 rounded-full flex shrink-0">
            <i className="pi pi-phone text-terciario"></i>
          </div>
          <span className="font-medium">{proveedor.telefono}</span>
        </div>
        
        {/* Dirección */}
        <div className="flex items-start gap-3">
          <div className="bg-green-50 p-2 rounded-full flex shrink-0">
            <i className="pi pi-map-marker text-terciario"></i>
          </div>
          <span className="line-clamp-2 mt-1">{proveedor.direccion}</span>
        </div>
      </div>
    </Card>
  );
};

export default Proveedor;