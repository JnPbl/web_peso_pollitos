import Histograma from "./HIstograma";
 /* eslint-disable react/prop-types */
const Estadisticas = ({ promedio, desviacion, cv, pesos }) => {
  return (
    <div>
      {promedio !== null && (
        <div>
          <h2>Estadísticas</h2>
          <p>Promedio: {promedio}</p>
          <p>Desviación Estándar: {desviacion}</p>
          <p>Coeficiente de Variación (CV): {cv}%</p>
        </div>
      )}
        <Histograma pesos={pesos} />
    </div>
  );
};

export default Estadisticas;
