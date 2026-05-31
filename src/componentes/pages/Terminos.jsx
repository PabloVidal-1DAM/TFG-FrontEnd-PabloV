import React from 'react';

const Terminos = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Términos y Condiciones</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Las presentes Condiciones Generales regulan el uso de la tienda online de TetraBIOS, dedicada a la venta de envases y embalajes ecológicos para el sector de la hostelería y distribución.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">1. Pedidos y Precios</h2>
        <p>
          Todos los pedidos están sujetos a la disponibilidad de los productos. Los precios indicados en pantalla están en euros (€) e incluyen los impuestos aplicables, a menos que se indique lo contrario.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">2. Envíos y Logística</h2>
        <p>
          Nuestros tiempos de entrega estándar son de 48-72 horas laborables desde la confirmación del pago. El estado de tu pedido podrá ser consultado en cualquier momento a través de tu panel de usuario.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">3. Política de Devoluciones</h2>
        <p>
          Al tratarse de productos destinados en muchos casos al contacto alimentario, las devoluciones solo se aceptarán si el producto se encuentra en su embalaje original intacto, en un plazo máximo de 14 días naturales desde la recepción del pedido.
        </p>
      </div>
    </div>
  );
};

export default Terminos;