import { useRef, useEffect} from "react";
import styles from "./MostrarPesos.module.css";
/* eslint-disable react/prop-types */
const MostrarPesos = ({ pesos }) => {
 

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    // Desplazamos el scroll al último elemento cuando pesos cambian
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [pesos]);
  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Pesos Ingresados:</h2>

      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <div className={styles.grid}>
          {pesos.map((peso, index) => (
            <div className={styles.element} key={index}>
              <ul className={styles.ul}>
                <li>
                  <b>{index + 1}-</b> {peso}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>

    
  );
};


export default MostrarPesos;
