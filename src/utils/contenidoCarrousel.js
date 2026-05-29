import img1 from "../assets/cap1-carrousel.png";
import img2 from "../assets/cap2-carrousel.png";
import img3 from "../assets/cap3-carrousel.png";

// Se utiliza un archivo .js en lugar de un .json puro para poder importar las imágenes.
// En React (con Vite o Webpack), si escribimos una ruta relativa en texto dentro de un JSON ("../assets/img.png"), 
// el empaquetador la ignora y el navegador devuelve un error 404 al no encontrarla. 
// Al usar 'import', se fuerza a React a procesar la imagen durante la compilación y generar la ruta final correcta.

const datosCarousel = [
    {
        id: 1,
        titulo: "Clientes y Proveedores Reales",
        subtitulo: "La plataforma definitiva para gestionar tus pedidos y controlar el stock sin intermediarios.",
        imagen: img1, 
        textoBoton: "Ver Productos",
        ruta: "/catalogo" 
    },
    {
        id: 2,
        titulo: "Gestión de Stock Simplificada",
        subtitulo: "Mantén tu inventario al día con nuestro sistema automatizado.",
        imagen: img2, 
        textoBoton: "Saber Más",
        ruta: "/nosotros" 
    },
    {
        id: 3,
        titulo: "Seguridad y Confianza B2B",
        subtitulo: "Tus transacciones y datos empresariales totalmente protegidos con nuestra arquitectura.",
        imagen: img3,
        textoBoton: "Únete Ahora",
        ruta: "/signup" 
    }
];

export default datosCarousel;