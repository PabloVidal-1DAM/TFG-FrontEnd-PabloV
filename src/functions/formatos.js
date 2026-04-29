// Función que formatea la moneda traída del servidor a formato Europeo.
const formatearMoneda = (valor) => {
    const numero = parseFloat(valor);

    // Si por algún motivo no es un número válido, devuelve 0 para que no explote la web
    if (isNaN(numero)) return "0,00 €";

    // Se hace uso de la API de Internacionalización de JS. 
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(numero);
};

export {formatearMoneda};