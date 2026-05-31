import React from 'react';

const Cookies = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Política de Cookies</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Una cookie es un pequeño fichero de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">Cookies que utilizamos en TetraBIOS</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Cookies Técnicas (Estrictamente necesarias):</strong> Permiten al usuario la navegación a través de la página web y la utilización de las diferentes opciones como, por ejemplo, controlar el tráfico, identificar la sesión o acceder a partes de acceso restringido (como tu carrito de la compra).</li>
          <li><strong>Cookies de Análisis:</strong> Son aquellas que nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios de los productos ecológicos que ofrecemos.</li>
        </ul>
        <h2 className="text-xl font-bold text-gray-800 mt-6">Desactivación de cookies</h2>
        <p>
          Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador.
        </p>
      </div>
    </div>
  );
};

export default Cookies;