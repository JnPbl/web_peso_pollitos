import { useState } from "react";
import styles from "./DatosGranja.module.css"
/* eslint-disable react/prop-types */
const DatosGranja = () => {
  const [granja, setGranja] = useState({
    nombre: "",
    fecha: "",
    lote: "",
    galpon: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setGranja((prevState) => ({
      ...prevState,
      [name]: value, // Actualizamos solo el campo correspondiente
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Datos de la granja:</h2>
      
      <form>
      <div className={styles.contForm}>
        <div>
          <label className={styles.label}>Granja:</label>
          <input
          className={styles.input}
            type="text"
            name="nombre"
            value={granja.nombre}
            onChange={manejarCambio}
          />
        </div>
        <div>
          <label className={styles.label}>Fecha:</label>
          <input
          className={styles.input}
            type="text"
            name="fecha"
            value={granja.fecha}
            onChange={manejarCambio}
          />
        </div>
        <div>
          <label className={styles.label}>Lote:</label>
          <input
          className={styles.input}
            type="text"
            name="lote"
            value={granja.lote}
            onChange={manejarCambio}
          />
        </div>
        <div>
          <label className={styles.label}>Galpon:</label>
          <input
          className={styles.input}
            type="text"
            name="galpon"
            value={granja.galpon}
            onChange={manejarCambio}
          />
        </div>
        </div>
      </form>
     
    </div>
  );
};

export default DatosGranja;
