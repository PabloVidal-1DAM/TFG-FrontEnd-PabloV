import React from 'react';

const Privacidad = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Política de Privacidad</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          En TetraBIOS valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tus datos personales cuando utilizas nuestra tienda online, en cumplimiento con el Reglamento General de Protección de Datos (RGPD).
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">1. Recopilación de Datos</h2>
        <p>
          Recopilamos información que nos proporcionas directamente al crear una cuenta, realizar un pedido, o comunicarte con nosotros. Esto incluye tu nombre, dirección de correo electrónico, dirección postal y número de teléfono.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">2. Uso de la Información</h2>
        <p>
          Utilizamos tus datos para procesar tus pedidos, gestionar el envío de la mercancía ecológica, enviarte notificaciones sobre el estado de tu compra y mejorar tu experiencia en nuestra plataforma.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">3. Tus Derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar, limitar, cancelar u oponerte al tratamiento de tus datos en cualquier momento. Para ejercer estos derechos, por favor contáctanos en privacidad@tetrabios.com.
        </p>
      </div>
    </div>
  );
};

export default Privacidad;