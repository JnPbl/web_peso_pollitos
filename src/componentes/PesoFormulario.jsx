import { useState,useRef } from "react";
import styles from "./PesoFormulario.module.css";
import { forwardRef } from "react";

/* eslint-disable react/prop-types */
const PesoForm = forwardRef(
  ({ agregarPeso, editarPeso, eliminarPeso, pesos, agregarPesoCaja, modo,setModo,bloqueado }, ref) => {
    const [peso, setPeso] = useState("");
    const [indice, setIndice] = useState(""); // Estado para el índice
    const [nuevoPeso, setNuevoPeso] = useState(""); // Estado para el nuevo peso
    //const [modo, setModo] = useState("individual");

    const [cantidadCaja,setCantidadCaja] = useState("");
    const cantidadRef = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      if(modo == "individual"){
        if (peso > 0) {
          agregarPeso(parseFloat(peso));
          setPeso("");
        }
      }else{
        if (peso > 0 && !isNaN(cantidadCaja) && cantidadCaja > 0) {
          const pesoTotal = parseFloat(peso);
          agregarPeso(pesoTotal);
          setPeso("");
          const pesoIndividual = parseFloat((pesoTotal / cantidadCaja).toFixed(2));
          const nuevosPesos = Array(cantidadCaja).fill(pesoIndividual);
          agregarPesoCaja(nuevosPesos);
          //nuevosPesos.forEach(p => agregarPesoCaja(p));

        }
      }
      
    };

    const handleAgregarCantidadCaja = () =>{
      const cantidad = parseInt(cantidadRef.current.value);
      if (!isNaN(cantidad)) {
        setCantidadCaja(cantidad);
      }
    };

    const handleModo = (newModo) => {
      setModo(newModo);
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
      <div className={styles.containerGeneral}>
        <div className={styles.pesoOpciones}>
          <label className={styles.pesoLabel}>
            <input
              className={styles.pesoOpcionesInput}
              type="radio"
              name="modo"
              value="individual"
              checked={modo === "individual"}
              onChange={() => handleModo("individual")}
            />
            Peso INDIVIDUAL
          </label>
          <label className={styles.pesoLabel}>
            <input
              className={styles.pesoOpcionesInput}
              type="radio"
              name="modo"
              value="total"
              checked={modo === "total"}
              onChange={() => handleModo("total")}
            />
            Peso en CAJA
          </label>
        </div>
        

        <div className={styles.container}>

        {modo !== "individual" && (
            <div className={styles.containerCaja}>
              <div className={styles.parrafo}>
                <p>Ingrese BB x Caja</p>
              </div>
              <div className={styles.inputBotn}>
                <input
                  className={styles.inputEdit}
                  type="number"
                  ref={cantidadRef}
                  placeholder="cantidad"
                  min="1"
                  required
                />
                <button className={styles.buttonEditar} disabled ={bloqueado} type="button" onClick={handleAgregarCantidadCaja}>AGREGAR</button>
              </div>
            </div>
          )}


          <div>
            <form onSubmit={handleSubmit} >
              <label className={styles.labelPeso}>INGRESE EL PESO: </label>
              <input
                ref={ref}
                className={styles.inputPeso}
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                min="0"
                step="any"
                //placeholder="Ingresa el peso"
                required
              />
              <button className={styles.buttonAgregar}disabled ={bloqueado} type="submit">
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
                  min="1"
                  required
                />
                <input
                  className={styles.inputEdit}
                  type="number"
                  value={nuevoPeso}
                  min="0"
                  step="any"
                  onChange={(e) => setNuevoPeso(e.target.value)}
                  placeholder="peso"
                  required
                />
              </div>
              <div className={styles.containerButon}>
                <button className={styles.buttonEditar} disabled ={bloqueado} onClick={handleEditar}>
                  EDITAR
                </button>
                <button
                  className={styles.buttonEditar}
                  onClick={handleEliminar}
                  disabled ={bloqueado}
                >
                  ELIMINAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

PesoForm.displayName = "PesoForm";

export default PesoForm;
