
import styles from "./Estadisticas.module.css";
 /* eslint-disable react/prop-types */
const Estadisticas = ({ promedio, desviacion, cv}) => {
  return (
    <div className={styles.container}>
      {promedio !== null && (
        <div className={styles.calculos}>
          <h2 className={styles.titulo}>Estadísticas:</h2>
          <div className={styles.parametros}>
          <p>Promedio: {promedio} gr.</p>
          <p>Desviación Estándar: {desviacion}</p>
          <p>Coeficiente de Variación (CV): {cv}%</p>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default Estadisticas;
