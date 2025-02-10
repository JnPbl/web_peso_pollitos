import { useState } from "react";
import styles from "./PesoFormulario.module.css";

/* eslint-disable react/prop-types */
const PesoForm = ({ agregarPeso, editarPeso, eliminarPeso, pesos }) => {
  const [peso, setPeso] = useState("");
  const [indice, setIndice] = useState(""); // Estado para el índice
  const [nuevoPeso, setNuevoPeso] = useState(""); // Estado para el nuevo peso

  const handleSubmit = (e) => {
    e.preventDefault();
    if (peso) {
      agregarPeso(parseFloat(peso));
      setPeso("");
    }
  };

  // Función para manejar el evento de editar
  const handleEditar = (e) => {
    e.preventDefault();
    const indiceNum = parseInt(indice);
    const nuevoPesoNum = parseFloat(nuevoPeso);

    if (
      !isNaN(indiceNum) &&
      !isNaN(nuevoPesoNum) &&
      indiceNum > 0 &&
      indiceNum <= pesos.length
    ) {
      editarPeso(indiceNum, nuevoPesoNum); // Llamar a la función que edita el peso
      setIndice("");
      setNuevoPeso("");
      alert(`Peso en el índice ${indiceNum} modificado a ${nuevoPesoNum}`);
    } else {
      alert("Índice o valor no válido.");
    }
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    const indiceNum = parseInt(indice);

    if (!isNaN(indiceNum) && indiceNum > 0 && indiceNum <= pesos.length) {
      eliminarPeso(indiceNum); // Llamar a la función que elimina el peso
      setIndice("");
      setNuevoPeso("");
      alert(`Peso en el índice ${indiceNum} eliminado.`);
    } else {
      alert("Índice no válido.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.peso}>
        <form onSubmit={handleSubmit}>
          <label className={styles.labelPeso}>INGRESE EL PESO: </label>
          <input
            className={styles.inputPeso}
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            //placeholder="Ingresa el peso"
            required
          />
          <button className={styles.buttonAgregar} type="submit">
            AGREGAR
          </button>
        </form>
      </div>

      <form>
        <div className={styles.edit}>
          <div className={styles.containerInput}>
            <input
              className={styles.inputEdit}
              type="number"
              value={indice}
              onChange={(e) => setIndice(e.target.value)}
              placeholder="indice"
              required
            />
            <input
              className={styles.inputEdit}
              type="number"
              value={nuevoPeso}
              onChange={(e) => setNuevoPeso(e.target.value)}
              placeholder="peso"
              required
            />
          </div>
          <div className={styles.containerButon}>
            <button className={styles.buttonEditar} onClick={handleEditar}>
              EDITAR
            </button>
            <button className={styles.buttonEditar} onClick={handleEliminar}>
              ELIMINAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PesoForm;
