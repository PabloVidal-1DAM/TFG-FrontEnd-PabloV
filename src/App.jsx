import "primereact/resources/themes/lara-light-indigo/theme.css"; // Configuración de estilos de libreria PrimeReact
import "primereact/resources/primereact.min.css"; // CSS del núcleo
import "primeicons/primeicons.css"; // Iconos
import "./App.css";

import Header from "./componentes/estructura/Header.jsx";
import Contenido from "./componentes/estructura/Contenido.jsx";
import Rutas from "./componentes/estructura/Rutas.jsx";
import Pie from "./componentes/estructura/Pie.jsx";
import ProveedorProductos from "./componentes/context/ProveedorProductos.jsx";
import ProveedorSesion from "./componentes/context/ProveedorSesion.jsx";
import ProveedorPedidos from "./componentes/context/ProveedorPedidos.jsx";
import Notificacion from "./componentes/ui/Notificacion.jsx";

function App() {
  return (
    <>
      <ProveedorSesion>
        <Notificacion />
          <ProveedorPedidos>
            <Header />
            <Contenido>
              <ProveedorProductos>
                <Rutas />
              </ProveedorProductos>
            </Contenido>
            <Pie />
          </ProveedorPedidos>
      </ProveedorSesion>
    </>
  );
}

export default App;
