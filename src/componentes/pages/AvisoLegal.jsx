import React from 'react';

const AvisoLegal = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Aviso Legal</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), a continuación se hacen constar los datos identificativos de la empresa.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">1. Datos Identificativos</h2>
        <p>
          El titular del dominio web <strong>tetrabios.com</strong> es TetraBIOS S.L., con domicilio a estos efectos en [Tu Dirección], número de C.I.F.: B-12345678. Correo electrónico de contacto: contacto@tetrabios.com.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">2. Usuarios</h2>
        <p>
          El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6">3. Propiedad Intelectual e Industrial</h2>
        <p>
          TetraBIOS por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.).
        </p>
      </div>
    </div>
  );
};

export default AvisoLegal;