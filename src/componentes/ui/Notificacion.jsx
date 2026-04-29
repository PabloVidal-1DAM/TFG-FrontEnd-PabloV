import React from "react";
import useContextSesion from "../../hooks/useContextSesion"; 
import Mensaje from "./Mensaje";

// Componente creado para mostrar visualmente los errores y/o mensajes informativos
const Notificacion = () => {
  const { mensajes } = useContextSesion();

  return (
    mensajes && (
      /* Contenedor fijo arriba a la derecha con nuestra animación CSS personalizada de 3 segundos */
      <div className="fixed top-24 right-5 z-[9999] flex flex-col gap-3">
        {/* Recorremos el array dibujando cada notificación por pantalla. */}
        {mensajes.map((mensaje) => (
          <Mensaje key={mensaje.id} mensaje={mensaje} />
        ))}
      </div>
    )
  );
};

export default Notificacion;
