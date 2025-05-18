
import styles from "./Estadisticas.module.css";
 /* eslint-disable react/prop-types */
const Estadisticas = ({cantidadPesos, promedio, desviacion, cv, uniformidad,modo}) => {
  const unidad = modo === "individual" ? "gr" : "kg" ;
  return (
    <div className={styles.container}>
      {promedio !== null && (
        <div className={styles.calculos}>
          <h2 className={styles.titulo}>Estadísticas:</h2>
          <div className={styles.parametros}>
          <p>Total de bb pesados: {cantidadPesos} bb.</p>  
          <p>Promedio: {promedio} {unidad}.</p>
          <p>Desviación Estándar: {desviacion}</p>
          <p>Coeficiente de Variación (CV): {cv} %</p>
          <p>Uniformidad: {uniformidad} %</p>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default Estadisticas;
