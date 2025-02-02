import styles from "./MostrarPesos.module.css";
/* eslint-disable react/prop-types */
const MostrarPesos = ({ pesos }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Pesos Ingresados:</h2>
      <div className={styles.grid}>
      {pesos.map((peso, index) => (
        <div className={styles.element} key={index}>
          <ul className={styles.ul}>
              <li >
                <b>{index + 1}-</b> {peso}
              </li>
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
};

export default MostrarPesos;
