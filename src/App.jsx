import { useState, useRef } from "react";
import PesoForm from "./componentes/PesoFormulario.jsx";
import Estadisticas from "./componentes/Estadisticas.jsx";
import MostrarPesos from "./componentes/MostrarPesos.jsx";
import styles from "./index.module.css";
import Histograma from "./componentes/Histograma.jsx";
import DatosGranja from "./componentes/DatosGranja.jsx";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Layout from "./layout/Layout.jsx"

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
  });

  const histogramRef = useRef();

  // Función para actualizar los datos de la granja
  const actualizarDatosGranja = (datos) => {
    setGranja(datos);
  };

  // Función para agregar el peso al array
  const agregarPeso = (peso) => {
    setPesos([...pesos, peso]);
  };

  // Función para editar un peso
  const editarPeso = (index, nuevoPeso) => {
    const nuevosPesos = [...pesos];
    nuevosPesos[index-1] = nuevoPeso;
    setPesos(nuevosPesos);
  };

  // Función para eliminar un peso
  const eliminarPeso = (index) => {
    const nuevosPesos = pesos.filter((_, i) => i !== (index - 1));
    setPesos(nuevosPesos);
  };

  // Calcular promedio, desviación y CV
  const calcularEstadisticas = () => {
    if (pesos.length > 0) {
      const suma = pesos.reduce((acumulador, valor) => acumulador + valor, 0);
      const prom = (suma / pesos.length).toFixed(2);

      const varianza =
        pesos.reduce(
          (acumulador, valor) => acumulador + Math.pow(valor - prom, 2),
          0
        ) /
        (pesos.length - 1);
      const desviacion = Math.sqrt(varianza).toFixed(2);

      const coeficienteVariacion = ((desviacion / prom) * 100).toFixed(2);

      setPromedio(prom);
      setDesviacion(desviacion);
      setCV(coeficienteVariacion);
    }
  };

  const generarPDF = () => {
    html2canvas(histogramRef.current, { scale: 1 }).then((canvas) => {
      const histogramContainer = histogramRef.current;
      console.log(
        "Tamaño del histograma:",
        histogramContainer.offsetWidth,
        histogramContainer.offsetHeight
      );

      //---titulo------
      const doc = new jsPDF();
      doc.setFontSize(30);
      doc.text("Ingreso de Pesos de Bebés", 105, 20, { align: "center" });

      //----Datos granja--------
      doc.setFontSize(20);
      doc.text("Datos de la granja:", 15, 35);
      const anchoTexto1 = doc.getTextWidth("Datos de la granja:");
      doc.setLineWidth(0.5);
      doc.line(15, 35 + 2, 15 + anchoTexto1, 35 + 2);

      doc.setFontSize(15);
      doc.text(
        `Granja: ${granja.nombre}       Fecha: ${granja.fecha}          Lote: ${granja.lote}          Galpon: ${granja.galpon} `,
        105,
        45,
        { align: "center" }
      );

      //------pesos--------------
      doc.setFontSize(20);
      doc.text("Pesos Ingresados:", 15, 55);
      const anchoTexto2 = doc.getTextWidth("Pesos Ingresados:");
      doc.setLineWidth(0.5);
      doc.line(15, 55 + 2, 15 + anchoTexto2, 55 + 2);

      doc.setFontSize(10);

      let x = 15;
      let y = 65;
      const spaceBetween = 10;
      const maxPerLine = 18;

      pesos.forEach((dato, index) => {
        if (index > 0 && index % maxPerLine === 0) {
          y += 5; // Bajamos la posición vertical
          x = 15;
        }
        doc.text(`${dato}`, x, y);

        x += spaceBetween;
      });
      //-----Estadisticas--------------
      y += 10;
      doc.setFontSize(20);
      doc.text("Estadisticas:", 15, y);
      const anchoTexto3 = doc.getTextWidth("Estadisticas:");
      doc.setLineWidth(0.5);
      doc.line(15, y + 2, 15 + anchoTexto3, y + 2);

      doc.setFontSize(15);
      doc.text(`Promedio: ${promedio} gr `, 20, (y += 10));
      doc.text(`Desviacion Estandar: ${desviacion} `, 20, (y += 8));
      doc.text(`Coeficiente de Variacion: ${cv}% `, 20, (y += 8));

      //------Captura del grafico----------------
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let imgWidth = pageWidth - 30; // Dejar un margen de 10 a cada lado
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > pageHeight - 80) {
        // Consideramos márgenes en el PDF
        const scaleFactor = (pageHeight - 80) / imgHeight;
        imgWidth *= scaleFactor;
        imgHeight = pageHeight - 80;
      }
      const imgData = canvas.toDataURL("image/png");
      if (y + imgHeight > pageHeight - 10) {
        doc.addPage(); // Si la imagen no cabe, agregamos una nueva página
        y = 20; // Restablecemos la posición 'y' para la nueva página
      }

      doc.addImage(imgData, "PNG", 15, y + 10, imgWidth, imgHeight);

      doc.save(`${granja.nombre}_${granja.fecha}.pdf`);
    });
  };

  return (
    <Layout>
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Ingreso de Pesos de Bebés</h1>
        <DatosGranja onDatosChange={actualizarDatosGranja} />
        <PesoForm
          agregarPeso={agregarPeso}
          editarPeso={editarPeso}
          eliminarPeso={eliminarPeso}
          pesos={pesos}
        />
        <MostrarPesos pesos={pesos} />
        <button className={styles.buton} onClick={calcularEstadisticas}>
          Calcular Estadísticas
        </button>

        <Estadisticas promedio={promedio} desviacion={desviacion} cv={cv} />
        <Histograma pesos={pesos} ref={histogramRef} />
        <button className={styles.buton} onClick={generarPDF}>
          Generar PDF
        </button>
      </div>
    </div>
    </Layout>
  );
}

export default App;
