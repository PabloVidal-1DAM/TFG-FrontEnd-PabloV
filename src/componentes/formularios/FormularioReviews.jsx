import React, { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import useContextSesion from "../../hooks/useContextSesion";
import useContextProductos from "../../hooks/useContextProductos";
import Boton from "../ui/boton";

/**
 * COMPONENTE HIJO: FormularioReviews
 * * DECISIÓN ARQUITECTÓNICA: Aislamiento del estado local (Local State Isolation).
 * El estado de lo que el usuario teclea (inputs) se guarda exclusivamente aquí. 
 * Si estos estados estuvieran en el padre, cada letra pulsada en el teclado haría que 
 * TODA la lista de reseñas y la página del producto se volviera a renderizar, 
 * afectando gravemente al rendimiento de la aplicación.
 */
const FormularioReviews = ({ productoId, reviewAEditar, cerrarFormulario }) => {
  const { ponerMensaje } = useContextSesion();
  const { crearReview, editarReview } = useContextProductos();

  // Estado estrictamente local: Solo importa en el instante antes del submit
  const [formulario, setFormulario] = useState({
    valoracion: 0,
    comentario: "",
  });

  // Efecto secundario: Escucha cambios en la prop 'reviewAEditar'.
  // Si el padre manda un objeto, rellena los campos (modo Edición).
  // Si manda null, vacía los campos (modo Creación).
  useEffect(() => {
    if (reviewAEditar) {
      setFormulario({
        valoracion: parseFloat(reviewAEditar.valoracion),
        comentario: reviewAEditar.comentario,
      });
    } else {
      setFormulario({ valoracion: 0, comentario: "" });
    }
  }, [reviewAEditar]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (formulario.valoracion === 0) {
      ponerMensaje("error", "Por favor, selecciona al menos 1 estrella.");
      return;
    }

    // Encaminamiento dinámico de la petición a la API según el modo (Crear vs Editar)
    if (reviewAEditar) {
      await editarReview(reviewAEditar.id, productoId, formulario);
    } else {
      await crearReview(productoId, formulario);
    }

    // Una vez resuelta la promesa exitosamente, ordenamos al padre cerrar la ventana
    cerrarFormulario();
  };

  return (
    <form onSubmit={manejarEnvio} className="pt-2">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Valoración
        </label>
        <Rating
          value={formulario.valoracion}
          onChange={(e) => setFormulario({ ...formulario, valoracion: e.value })}
          cancel={false}
          pt={{
            onIcon: { className: "text-yellow-400 text-2xl" },
            offIcon: { className: "text-gray-300 text-2xl" },
          }}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Comentario
        </label>
        <textarea
          required
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primario focus:border-primario outline-none resize-none"
          placeholder="¿Qué te ha parecido este producto?"
          value={formulario.comentario}
          onChange={(e) => setFormulario({ ...formulario, comentario: e.target.value })}
        ></textarea>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
        <Boton
          tipo="button"
          variante="contorno"
          evento={cerrarFormulario}
          className="py-2 px-6"
        >
          Cancelar
        </Boton>
        <Boton
          tipo="submit"
          variante="primario"
          className="py-2 px-6 hover:bg-terciario hover:text-primario hover:font-bold transition"
        >
          {reviewAEditar ? "Actualizar" : "Publicar"}
        </Boton>
      </div>
    </form>
  );
};

export default FormularioReviews;