import "primereact/resources/themes/lara-light-indigo/theme.css"; // Configuración de estilos de libreria PrimeReact
import "primereact/resources/primereact.min.css";                  // CSS del núcleo
import "primeicons/primeicons.css";                                // Iconos
import './App.css'

import Header from "./componentes/estructura/Header.jsx";
import Menu from "./componentes/estructura/Menu.jsx";
import Contenido from "./componentes/estructura/Contenido.jsx";
import Rutas from "./componentes/estructura/Rutas.jsx";
import Pie from "./componentes/estructura/Pie.jsx";

function App() {
  return (
    <>
      <Header />
      <Menu />
      <Contenido>
        <Rutas />
      </Contenido>
      <Pie />
    </>
  )
}

export default App
