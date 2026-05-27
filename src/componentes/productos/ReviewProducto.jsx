import React from "react";
import useContextSesion from "../../hooks/useContextSesion";
import { Rating } from "primereact/rating";

/**
 * COMPONENTE HIJO: ReviewProducto
 * * PROPÓSITO: Representa visualmente una única reseña dentro de la lista.
 * DECISIÓN: Se extrae del mapeo principal para seguir el Principio de Responsabilidad Única (SRP).
 * Además, de forma autónoma consulta la sesión actual para saber si debe mostrar o no 
 * las acciones de edición/borrado al usuario logueado.
 */
const ReviewProducto = ({ review, abrirParaEditar, confirmarBorrado }) => {

  const { usuario, sesionIniciada } = useContextSesion();
  
  // Lógica de seguridad/UX: Comprobamos si la review iterada pertenece al usuario actual
  const esMiReview = sesionIniciada && usuario?.id === review.user_id;

  return (
    <div
      className={`border-b border-gray-50 pb-6 last:border-0 ${
        esMiReview ? "bg-green-50/30 p-4 rounded-xl border-green-100" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Rating
            value={parseFloat(review.valoracion)}
            readOnly
            cancel={false}
            pt={{ onIcon: { className: "text-yellow-400" } }}
          />
          <span className="font-bold text-gray-700">
            {review.user?.nombre || "Usuario Anónimo"}
            {esMiReview && (
              <span className="ml-2 text-xs bg-primario text-white px-2 py-0.5 rounded-full">
                Tú
              </span>
            )}
          </span>
        </div>
        <span className="text-xs text-gray-400 italic">
          {new Date(review.created_at).toLocaleDateString("es-ES")}
        </span>
      </div>

      <p className="text-gray-600 italic leading-relaxed mb-3">
        "{review.comentario}"
      </p>

      {/* Solo se renderizan los botones si el usuario es el dueño de esta reseña */}
      {esMiReview && (
        <div className="flex gap-4 border-t border-gray-200/60 pt-3 mt-2">
          <button
            onClick={() => abrirParaEditar(review)}
            className="text-sm font-semibold text-terciario hover:text-primario transition-colors flex items-center gap-1"
          >
            <i className="pi pi-pencil text-xs"></i> Editar
          </button>
          <button
            onClick={() => confirmarBorrado(review.id)}
            className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
          >
            <i className="pi pi-trash text-xs"></i> Borrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewProducto;