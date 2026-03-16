import React from 'react'

const LandingPage = () => {
  return (
    <section className="bg-green-50 rounded-2xl p-8 md:p-16 text-center grid gap-6 place-items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Conectando Clientes con <span className="text-green-600">Proveedores Reales</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
            La plataforma definitiva para gestionar tus pedidos y controlar el stock sin intermediarios innecesarios.
        </p>
        <button className="mt-4 bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 shadow-lg transition">
            Ver Productos
        </button>
    </section>
  )
}

export default LandingPage
