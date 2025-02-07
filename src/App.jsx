import { useState, useRef } from "react";
import PesoForm from "./componentes/PesoFormulario";
import Estadisticas from "./componentes/Estadisticas";
import MostrarPesos from "./componentes/MostrarPesos";
import styles from "./index.module.css";
import Histograma from "./componentes/HIstograma";
import DatosGranja from "./componentes/DatosGranja";
import {jsPDF} from "jspdf"
import html2canvas from 'html2canvas';

function App() {
  const [pesos, setPesos] = useState([]);
  const [promedio, setPromedio] = useState(null);
  const [desviacion, setDesviacion] = useState(null);
  const [cv, setCV] = useState(null);
  const [granja, setGranja] = useState({
    nombre: "",
    fecha: "",
    lote: "",
    galpon: "",
  })

  const histogramRef = useRef()

  // Función para actualizar los datos de la granja
   const actualizarDatosGranja = (datos) => {
    setGranja(datos);
  };


  // Función para agregar el peso al array
  const agregarPeso = (peso) => {
    setPesos([...pesos, peso]);
  };

  // Calcular promedio, desviación y CV
  const calcularEstadisticas = () => {
    if (pesos.length > 0) {
      const suma = pesos.reduce((acumulador, valor) => acumulador + valor, 0);
      const prom = (suma / pesos.length).toFixed(2);

      const varianza =
        pesos.reduce((acumulador, valor) => acumulador + Math.pow(valor - prom, 2), 0) /
        pesos.length;
      const desviacion = Math.sqrt(varianza).toFixed(2);

      const coeficienteVariacion = ((desviacion / prom) * 100).toFixed(2);

      setPromedio(prom);
      setDesviacion(desviacion);
      setCV(coeficienteVariacion);
    }
  };

  const generarPDF =()=>{

    html2canvas(histogramRef.current,{scale:1}).then((canvas)=>{

      const histogramContainer = histogramRef.current;
      console.log('Tamaño del histograma:', histogramContainer.offsetWidth, histogramContainer.offsetHeight);
    
     
  
    const doc = new jsPDF();
    doc.setFontSize(30)
    doc.text("Ingreso de Pesos de Bebés",105,20,{align:"center"})

    doc.setFontSize(20)
    doc.text("Datos de la granja:",15,35)
    const anchoTexto1 = doc.getTextWidth("Datos de la granja:");
    doc.setLineWidth(0.5);
    doc.line(15, 35 + 2, 15 + anchoTexto1, 35 + 2);

    doc.setFontSize(15)
    doc.text(`Granja: ${granja.nombre}       Fecha: ${granja.fecha}          Lote: ${granja.lote}          Galpon: ${granja.galpon} `,105,45,{align:"center"})

    doc.setFontSize(20)
    doc.text("Pesos Ingresados:",15,55)
    const anchoTexto2 = doc.getTextWidth("Pesos Ingresados:");
    doc.setLineWidth(0.5);
    doc.line(15, 55 + 2, 15 + anchoTexto2, 55 + 2);

    doc.setFontSize(10)

    let x = 15;
    let y = 65;
    const spaceBetween = 10
    const maxPerLine = 18;

    pesos.forEach((dato,index)=>{

      if (index > 0 && index % maxPerLine === 0) {
        y += 5;  // Bajamos la posición vertical
        x = 15;

      }
      doc.text(`${dato}`,x,y  )

      x += spaceBetween
    })

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let imgWidth = pageWidth - 30; // Dejar un margen de 10 a cada lado
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > pageHeight - 80) { // Consideramos márgenes en el PDF
      const scaleFactor = (pageHeight - 80) / imgHeight;
      imgWidth *= scaleFactor;
      imgHeight = pageHeight - 80;
    }
    const imgData = canvas.toDataURL('image/png');

    console.log("Canvas capturado:", imgWidth,imgHeight,pageWidth);
    
    doc.addImage(imgData, 'PNG', 15, y + 10, imgWidth, imgHeight); 

    doc.save("grnja.pdf")
  })
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Ingreso de Pesos de Bebés</h1>
        <DatosGranja onDatosChange={actualizarDatosGranja} />
        <PesoForm agregarPeso={agregarPeso} />
        <MostrarPesos pesos={pesos} />
        <button className={styles.buton} onClick={calcularEstadisticas}>Calcular Estadísticas</button>

        <Estadisticas
          promedio={promedio}
          desviacion={desviacion}
          cv={cv}
        />
         <Histograma pesos={pesos} ref={histogramRef}/>
         <button onClick={generarPDF}>PDF</button>
      </div>
    </div>
  );
}

export default App;
