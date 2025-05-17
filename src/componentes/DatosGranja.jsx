import { useState} from "react";
import styles from "./DatosGranja.module.css";
import  { forwardRef } from 'react';
/* eslint-disable react/prop-types */
const DatosGranja = forwardRef(({ onDatosChange, onEnter },ref) => {
  const [granja, setGranja] = useState({
    nombre: "s/nombre",
    fecha: "",
    lote: "s/nombre",
    galpon: "",
    edad:""
  });

  const granjas = [
    "sin nombre",
    "Badia",
    "Basilico",
    "Blanco",
    "Bello",
    "D'Agostino",
    "Don Libertario",
    "Dos Pinos",
    "El Jagüel",
    "El Treból",
    "Fegersil",
    "Feghan",
    "Giorgi 1",
    "Giorgi 2",
    "Giorgi 3",
    "Gladys",
    "Km. 24",
    "La Esperanza",
    "La Querencia",
    "Las Azucenas",
    "Liber-Dar",
    "Oneto 1",
    "Oneto 2",
    "Ramallo 1",
    "Ramallo 2 Nº1",
    "Ramallo 2 Nº2",
    "Ramallo 2 Nº3",
    "San Eduardo 1",
    "San Eduardo 2",
    "San Eduardo 3",
    "San Pedro",
    "San Ramon",
    "San Matias",
    "Santa Marta",
    "Tagliatore",
    "Una",
    "Uribe",
    "Vaquero",
    "Vila 1",
    "Vila 2",
    "Don Roberto",
  ];
  

   const manejarEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      ref.current?.focus(); // Llamar la función pasada por el padre
    }
  };

  const manejarEnter2 = (event) => {
    if (event.key === 'Enter') {
      onEnter(); // Llamar la función pasada por el padre
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Esto evita que el formulario se envíe y recargue la página
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setGranja((prevState) => ({
      ...prevState,
      [name]: value, // Actualizamos solo el campo correspondiente
    }));
    onDatosChange({ ...granja, [name]: value });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Datos de la granja:</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.contForm}>
          <div className={styles.contLavelInput} >
            <label className={styles.label}>Granja</label>

            <select
              className={styles.input}
              name="nombre"
              value={granja.nombre}
              onChange={manejarCambio}
            >
              {granjas.map((granjaOption, index) => (
                <option key={index} value={granjaOption}>
                  {granjaOption}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.contLavelInput} >
            <label className={styles.label}>Fecha</label>
            <input
              className={styles.input}
              type="date"
              name="fecha"
              value={granja.fecha}
              onChange={manejarCambio}
            />
          </div>
          <div className={styles.contLavelInput}>
           
            <label className={styles.label}>Lote</label>
           
            <select
              className={styles.input}
              name="lote"
              value={granja.lote}
              onChange={manejarCambio}
            >
              <option value="sin nombre">sin nombre</option>
              <option value="Solis 1">Solis 1</option>
              <option value="Solis 2">Solis 2</option>
              <option value="Solis 3">Solis 3</option>
              <option value="Solis 6">Solis 6</option>
              <option value="Solis 7">Solis 7</option>
              <option value="Atucha">Atucha</option>
              <option value="Etchegoyen">Etchegoyen</option>
            </select>
          </div>
          <div className={styles.contLavelInput}>
            <label className={styles.label}>Galpon</label>
            <input
              className={styles.input}
              type="text"
              name="galpon"
              value={granja.galpon}
              onChange={manejarCambio}
              onKeyDown={manejarEnter}
            />
          </div>

          <div className={styles.contLavelInput}>
            <label className={styles.label}>Edad</label>
            <input
              className={styles.input}
              type="number"
              name="edad"
              value={granja.edad}
              onChange={manejarCambio}
              ref={ref}
              onKeyDown={manejarEnter2}
            />
          </div>
        </div>
      </form>
    </div>
  );
});

DatosGranja.displayName = "DatosGranja"
export default DatosGranja;
