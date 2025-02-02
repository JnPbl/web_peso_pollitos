import { useState } from 'react'
import PesoForm from './componentes/PesoFormulario';
import Estadisticas from './componentes/Estadisticas';

import './App.css'

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
      const suma = pesos.reduce((acc, curr) => acc + curr, 0);
      const prom = suma / pesos.length;

      const varianza = pesos.reduce((acc, curr) => acc + Math.pow(curr - prom, 2), 0) / pesos.length;
      const desviacion = Math.sqrt(varianza);

      const coeficienteVariacion = (desviacion / prom) * 100;

      setPromedio(prom);
      setDesviacion(desviacion);
      setCV(coeficienteVariacion);
    }
  };

  return (
    <div>
    <h1>Ingreso de Pesos de Bebés</h1>
    <PesoForm agregarPeso={agregarPeso} />
    <button onClick={calcularEstadisticas}>Calcular Estadísticas</button>

    <Estadisticas
      promedio={promedio}
      desviacion={desviacion}
      cv={cv}
      pesos={pesos}
    />
  </div>
  )
}

export default App
