import React from "react";
import { Rating } from "primereact/rating"; // Uso del componente Rating de prime react para las estrellas

const ReviewsProducto = ({producto}) => {
  return (
    <>
      {/* --- Sección para las opinioones dejadas de los usuarios a los productos de la BBDD. --- */}
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
          Opiniones de los usuarios
        </h2>

        {producto.reviews && producto.reviews.length > 0 ? (
          <div className="space-y-8">
            {producto.reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-50 pb-6 last:border-0"
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
                      {review.user?.name || "Usuario Anónimo"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 italic">
                    {new Date(review.created_at).toLocaleDateString("es-ES")}
                  </span>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{review.comentario}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <i className="pi pi-comment text-4xl text-gray-200 mb-4"></i>
            <p className="text-gray-400">
              Aún no hay reseñas para este producto. ¡Sé el primero en comprarlo
              y opinar!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewsProducto;
