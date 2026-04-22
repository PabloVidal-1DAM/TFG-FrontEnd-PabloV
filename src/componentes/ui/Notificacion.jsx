import React from "react";
import useContextSesion from "../hooks/useContextSesion"; // Asegúrate de que la ruta sea correcta

// Estilos que gastará este componente dependiendo del tipo de mensaje pasado.
const estilosPorTipo = {
  exito: "bg-green-100 border-green-500 text-green-800",
  error: "bg-red-100 border-red-500 text-red-800",
  info: "bg-blue-100 border-blue-500 text-blue-800",
};

// Iconos de PrimeIcons correspondientes a cada tipo
const iconosPorTipo = {
  exito: "pi-check-circle",
  error: "pi-times-circle",
  info: "pi-info-circle",
};

// Componente creado para mostrar visualmente los errores y/o mensajes informativos
const Notificacion = () => {
  const { mensajes } = useContextSesion();

  return (
    mensajes && (
      /* Contenedor fijo arriba a la derecha con nuestra animación CSS personalizada de 3 segundos */
      <div className="fixed top-24 right-5 z-[9999] flex flex-col gap-3">
        {/* 3. Recorremos el array dibujando cada notificación */}
        {mensajes.map((mensaje) => (
          <div
            key={mensaje.id} // Obligatorio en React al hacer .map()
            className={`animacion-notificacion flex flex-row items-start gap-4 p-5 rounded-lg border-l-4 shadow-xl min-w-[320px] max-w-md ${estilosPorTipo[mensaje.tipo] || estilosPorTipo.info}`}
          >
            <i
              className={`pi ${iconosPorTipo[mensaje.tipo] || iconosPorTipo.info} text-2xl mt-0.5`}
            ></i>
            <div className="flex flex-col gap-1">
              <p className="font-extrabold text-sm uppercase tracking-wider">
                {mensaje.tipo}
              </p>
              <p className="text-base font-medium">{mensaje.texto}</p>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Notificacion;
