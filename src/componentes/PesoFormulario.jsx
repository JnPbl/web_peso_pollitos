import { useState } from 'react'
import styles from "./PesoFormulario.module.css"

 /* eslint-disable react/prop-types */
const PesoForm = ({ agregarPeso }) => {
  const [peso, setPeso] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (peso) {
      agregarPeso(parseFloat(peso));
      setPeso('');
    }
  };

  return (
    <div className={styles.div}>
    <form onSubmit={handleSubmit}>
      <label className={styles.label} >INGRESE EL PESO: </label>
      <input
      className={styles.input}
        type="text"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        //placeholder="Ingresa el peso"
        required
      />
      <button className={styles.button} type="submit">AGREGAR</button>
    </form>
    </div>
  );
};

export default PesoForm;
