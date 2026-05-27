import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import useContextSesion from "../../hooks/useContextSesion";
import useContextProductos from "../../hooks/useContextProductos";
import Boton from "../ui/boton";
import ReviewProducto from "./ReviewProducto";
import FormularioReviews from "../formularios/FormularioReviews";

// Este componente padre enseña la lista de reseñas y la visibilidad de la ventana modal, 
// delegando la lógica de pintar cada reseña a <ReviewProducto>  y la lógica del formulario a <FormularioReviews>.

const ReviewsProducto = ({ producto }) => {
  const { usuario, sesionIniciada } = useContextSesion();
  const { eliminarReview } = useContextProductos();

  //Estados que controlan la ventana modal y qué datos se van a editar.
  // Se mantienen en el padre porque afectan a componentes hermanos (el botón de crear y la lista).
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reviewAEditar, setReviewAEditar] = useState(null);

  // Comprobación para evitar que un usuario deje múltiples reseñas en el mismo producto.
  const reviewDelUsuario = sesionIniciada
    ? producto.reviews.find((r) => r.user_id === usuario.id)
    : null;

  // Funciones que manejan los estados del formulario
  const abrirParaCrear = () => {
    setReviewAEditar(null); // Nos aseguramos de que el formulario se abra en modo "Creación"
    setMostrarFormulario(true);
  };

  const abrirParaEditar = (review) => {
    setReviewAEditar(review); // Pasamos los datos actuales para que el hijo los rellene
    setMostrarFormulario(true);
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setReviewAEditar(null);
  };

  // Función que se importa junto al componente de la ventana modal, done se le da formato y estilo a como se va a usar el componente de prime react.
  const confirmarBorrado = (reviewId) => {
    confirmDialog({
      message: "¿Estás seguro de que quieres borrar tu reseña? Esta acción no se puede deshacer.",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle text-red-500 mr-3 text-2xl",
      acceptLabel: "Sí, borrar",
      rejectLabel: "Cancelar",
      acceptClassName: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg ml-3 border-none transition-colors",
      rejectClassName: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-4 rounded-lg transition-colors",
      accept: () => eliminarReview(reviewId, producto.id),
    });
  };

  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-sm relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-100 pb-4 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Opiniones de los usuarios
          </h2>

          {sesionIniciada && !reviewDelUsuario && (
            <Boton variante="primario" evento={abrirParaCrear} className="py-2 px-4 text-sm">
              <i className="pi pi-pencil mr-2"></i> Escribir reseña
            </Boton>
          )}

          {!sesionIniciada && (
            <span className="text-sm text-gray-400 italic">
              Inicia sesión para dejar tu opinión.
            </span>
          )}
        </div>

        {/* CONTENEDOR MODAL: Se le inyecta el componente FormularioReviews para mantener el código limpio */}
        <Dialog
          header={reviewAEditar ? "Editando tu reseña" : "Crea una reseña"}
          visible={mostrarFormulario}
          style={{ width: "90vw", maxWidth: "500px" }}
          onHide={cancelarFormulario}
          draggable={false}
          pt={{
            header: { className: "p-6 pb-2 text-xl font-bold text-gray-800" },
            content: { className: "p-6" },
          }}
        >
          {/* Se inyectan por props las dependencias necesarias al hijo */}
          <FormularioReviews 
            productoId={producto.id} 
            reviewAEditar={reviewAEditar} 
            cerrarFormulario={cancelarFormulario} 
          />
        </Dialog>

        {/* RENDERIZADO DE LA LISTA: Delegado al subcomponente ReviewProducto */}
        {producto.reviews && producto.reviews.length > 0 ? (
          <div className="space-y-8">
            {producto.reviews.map((review) => {
              return (
                <ReviewProducto
                  key={review.id}
                  review={review}
                  abrirParaEditar={abrirParaEditar}
                  confirmarBorrado={confirmarBorrado}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <i className="pi pi-comment text-4xl text-gray-200 mb-4"></i>
            <p className="text-gray-400">
              Aún no hay reseñas para este producto. ¡Sé el primero en opinar!
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        pt={{
          header: { className: "p-6 pb-4 text-xl font-bold text-gray-800" },
          content: { className: "px-6 pb-6 flex items-center text-gray-600" },
          footer: { className: "p-6 pt-0 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-lg" },
        }}
      />
    </>
  );
};

export default ReviewsProducto;