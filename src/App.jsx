import { useState } from "react";
import PesoForm from "./componentes/PesoFormulario";
import Estadisticas from "./componentes/Estadisticas";
import MostrarPesos from "./componentes/MostrarPesos";
import styles from "./index.module.css";
import Histograma from "./componentes/HIstograma";

function App() {
  const [pesos, setPesos] = useState([]);
  const [promedio, setPromedio] = useState(null);
  const [desviacion, setDesviacion] = useState(null);
  const [cv, setCV] = useState(null);

  // Función para agregar el peso al array
  const agregarPeso = (peso) => {
    setPesos([...pesos, peso]);
  };

  // Calcular promedio, desviación y CV
  const calcularEstadisticas = () => {
    if (pesos.length > 0) {
      const suma = pesos.reduce((acumulador, valor) => acumulador + valor, 0);
      const prom = (suma / pesos.length).toFixed(2);

      const varianza =
        pesos.reduce((acumulador, valor) => acumulador + Math.pow(valor - prom, 2), 0) /
        pesos.length;
      const desviacion = Math.sqrt(varianza).toFixed(2);

      const coeficienteVariacion = ((desviacion / prom) * 100).toFixed(2);

      setPromedio(prom);
      setDesviacion(desviacion);
      setCV(coeficienteVariacion);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Ingreso de Pesos de Bebés</h1>
        <PesoForm agregarPeso={agregarPeso} />
        <MostrarPesos pesos={pesos} />
        <button className={styles.buton} onClick={calcularEstadisticas}>Calcular Estadísticas</button>

        <Estadisticas
          promedio={promedio}
          desviacion={desviacion}
          cv={cv}
        />
         <Histograma pesos={pesos} />
      </div>
    </div>
  );
}

export default App;
