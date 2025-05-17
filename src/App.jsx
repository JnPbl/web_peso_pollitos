import { useState, useRef, useEffect } from "react";
import PesoForm from "./componentes/PesoFormulario.jsx";
import Estadisticas from "./componentes/Estadisticas.jsx";
import MostrarPesos from "./componentes/MostrarPesos.jsx";
import styles from "./index.module.css";
import Histograma from "./componentes/Histograma.jsx";
import DatosGranja from "./componentes/DatosGranja.jsx";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Layout from "./layout/Layout.jsx";

function App() {
  const [reiniciado, setReiniciado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [pesos, setPesos] = useState([]);
  const [pesosCaja, setPesosCaja] = useState([]);
  const [modo, setModo] = useState("individual");
  const [promedio, setPromedio] = useState(null);
  const [desviacion, setDesviacion] = useState(null);
  const [cv, setCV] = useState(null);
  const [uniformidad, setUniformidad] = useState(null);
  const [granja, setGranja] = useState({
    nombre: "s/nombre",
    fecha: "",
    lote: "s/nombre",
    galpon: "",
    edad:""
  });
  const [imagen, setImagen] = useState({
    width: 0,
    height: 0,
    image: "",
  });

  const [granjas, setGranjas] = useState([]);
  /*
  const agregarNuevaGranja = useCallback(() =>{
    const nuevaGranja = {
      granja: granja,
      pesos: pesos,
      promedio: promedio,
      desviacion: desviacion,
      cv:cv,
    }

    setGranjas((prevGranjas)=>[...prevGranjas, nuevaGranja]);
},[promedio, desviacion, cv]);



useEffect(() => {
  if (promedio && desviacion && cv) {
    agregarNuevaGranja();
  }
}, [promedio, desviacion, cv, agregarNuevaGranja]);
*/

  useEffect(() => {
    if(reiniciado){
      window.scrollTo({ top: 0, behavior: "smooth" });
      setReiniciado(false);
    }
  }, [reiniciado]);

  useEffect(() => {
    if (promedio && desviacion && cv && uniformidad && imagen.image != "") {
      const nuevaGranja = {
        granja: granja,
        pesos: modo === "individual" ? pesos : pesosCaja,
        promedio: promedio,
        desviacion: desviacion,
        cv: cv,
        uniformidad: uniformidad,
        grafico: imagen,
      };

      setGranjas((prevGranjas) => [...prevGranjas, nuevaGranja]);
    }
  }, [
    promedio,
    desviacion,
    cv,
    uniformidad,
    granja,
    pesos,
    pesosCaja,
    imagen,
    modo,
  ]); // Este useEffect depende de todos los valores relevantes

  const agregarNuevaGranja = () => {
    setBloqueado(false);
    setGranja({
      nombre: "",
      fecha: "",
      lote: "",
      galpon: "",
      edad:""
    });
    setPesos([]);
    setPesosCaja([]);
    setPromedio(null);
    setDesviacion(null);
    setCV(null);
    setUniformidad(null);
    setImagen({
      width: 0,
      height: 0,
      image: "",
    });
    setReiniciado(true);
  };
  const histogramRef = useRef();
  const pesoRef = useRef(null);
  const edadRef = useRef(null); 
  const pdfButonRef = useRef(null);

  const moverFocus = () => {
    pesoRef.current.focus();
  };

  // Función para actualizar los datos de la granja
  const actualizarDatosGranja = (datos) => {
    setGranja(datos);
  };

  // Función para agregar el peso al array
  const agregarPeso = (peso) => {
    setPesos([...pesos, peso]);
  };

  const agregarPesoCaja = (peso) => {
    setPesosCaja((prev) => [...prev, ...peso]);
    //setPesosCaja([...pesosCaja,peso]);
  };

  // Función para editar un peso
  const editarPeso = (index, nuevoPeso) => {
    const nuevosPesos = [...pesos];
    nuevosPesos[index - 1] = nuevoPeso;
    setPesos(nuevosPesos);
    
  };

  // Función para eliminar un peso
  const eliminarPeso = (index) => {
    const nuevosPesos = pesos.filter((_, i) => i !== index - 1);
    setPesos(nuevosPesos);
    
  };

  // Calcular promedio, desviación , uniformidad y CV
  const calcularEstadisticas = () => {
    const valores = modo === "individual" ? pesos : pesosCaja;
    setBloqueado(true);
    if (valores.length > 0) {
      const suma = valores.reduce((acumulador, valor) => acumulador + valor, 0);
      const prom = suma / valores.length;

      const varianza =
        valores.reduce(
          (acumulador, valor) => acumulador + Math.pow(valor - prom, 2),
          0
        ) /
        (valores.length - 1);
      const desviacion = Math.sqrt(varianza);

      const coeficienteVariacion = (desviacion / prom) * 100;

      const rangoMin = prom * 0.9;
      const rangoMax = prom * 1.1;
      let acum = 0;
      
      valores.forEach((p) => {
        if (p >= rangoMin && p <= rangoMax) {
          acum = acum + 1;
        }
      });

      const uniformida = (acum / valores.length) * 100;
  

      setPromedio(prom.toFixed(2));
      setDesviacion(desviacion.toFixed(2));
      setCV(coeficienteVariacion.toFixed(2));
      setUniformidad(uniformida.toFixed(2));
    }
    guardarImagen();

    setTimeout(() => {
      if (pdfButonRef.current) {
        pdfButonRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  const guardarImagen = () => {
    html2canvas(histogramRef.current, { scale: 1 }).then((canvas) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageBase64 = canvas.toDataURL(); // Convierte el canvas a una imagen base64

      setImagen({
        width: canvasWidth,
        height: canvasHeight,
        image: imageBase64,
      });
    });
  };

  const reinicio = ()=>{
    setBloqueado(false);
  setGranja({
    nombre: "",
    fecha: "",
    lote: "",
    galpon: "",
    edad: ""
  });
  setPesos([]);
  setPesosCaja([]);
  setPromedio(null);
  setDesviacion(null);
  setCV(null);
  setUniformidad(null);
  setImagen({
    width: 0,
    height: 0,
    image: "",
  });
    setGranjas([]); 
    setReiniciado(true);
  }

  const generarPDF = () => {
    const doc = new jsPDF();

     const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, "0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaActual.getFullYear();

    const fechaFormateada = `${dia}-${mes}-${anio}`;

    let fechaGranja = fechaFormateada;

    if(granja?.fecha && granja.fecha.includes("-")){
      const [anio2, mes2, dia2] = granja.fecha.split("-");
      fechaGranja = `${dia2}-${mes2}-${anio2}`

    }


    granjas.forEach((granjaData, index) => {
      if (index > 0) {
        doc.addPage();
      }

      let posicionY = 35;
      let posicionX = 15;
      //---titulo------
      doc.setFontSize(30);
      doc.text("PESOS DE BEBES", 105, 20, { align: "center" });

      //----Datos granja--------
      doc.setFontSize(20);
      doc.text("DATOS DELA GRANJA:", posicionX, posicionY);
      const anchoTexto1 = doc.getTextWidth("DATOS DELA GRANJA:");
      doc.setLineWidth(0.5);
      doc.line(posicionX, posicionY + 2, posicionX + anchoTexto1, posicionY + 2);

      doc.setFontSize(15);

      //const [anio, mes, dia] = granjaData.granja.fecha.split("-");

      posicionY += 15;
      
      doc.text(`Granja:`,posicionX+5,posicionY);
      doc.text(`${granjaData.granja.nombre}`,105,posicionY);
      posicionY += 8;
      doc.text(`Fecha:`,posicionX+5,posicionY);
      doc.text(`${fechaGranja}`,105,posicionY);
      posicionY += 8;
      doc.text(`Lote:`, posicionX+5,posicionY);
      doc.text(`${granjaData.granja.lote}`, 105,posicionY);
      posicionY += 8;
      doc.text(`Galpon:`, posicionX+5,posicionY);
      doc.text(`${granjaData.granja.galpon}`, 105,posicionY);
      posicionY += 8;
      doc.text(`Edad:` , posicionX+5,posicionY); 
      doc.text(`${granjaData.granja.edad}` , 105,posicionY);   

      //------pesos--------------
      posicionY += 15;
      
      doc.setFontSize(20);
      doc.text("PESOS INGRESADOS:", posicionX, posicionY);
      const anchoTexto2 = doc.getTextWidth("PESOS INGRESADOS:");
      doc.setLineWidth(0.5);
      doc.line(posicionX, posicionY + 2, posicionX + anchoTexto2, posicionY + 2);

      doc.setFontSize(10);

      posicionY += 15;
      const spaceBetween = 10;
      const maxPerLine = 18;

      granjaData.pesos.forEach((dato, index) => {
        if (index > 0 && index % maxPerLine === 0) {
          posicionY += 5; // Bajamos la posición vertical
          posicionX = 15;
        }
        doc.text(`${dato}`, posicionX, posicionY);

        posicionX += spaceBetween;
      });
      //-----Estadisticas--------------
      posicionY += 15;
      posicionX = 15;
      doc.setFontSize(20);
      doc.text("ESTADISTICAS:", posicionX, posicionY);
      const anchoTexto3 = doc.getTextWidth("ESTADISTICAS:");
      doc.setLineWidth(0.5);
      doc.line(posicionX, posicionY + 2, posicionX + anchoTexto3, posicionY + 2);

      posicionX += 5;
      doc.setFontSize(15);
      const totalBB = modo === "individual" ? pesos.length : pesosCaja.length;

      doc.text(`Total de bb pesados:`, posicionX, (posicionY += 10));
      doc.text(`${totalBB}`, 105, posicionY );
      doc.text(`Promedio:`, posicionX, (posicionY += 8));
      doc.text(`${granjaData.promedio} gr `, 105, posicionY );
      doc.text(`Desviacion Estandar:`, posicionX, (posicionY += 8));
      doc.text(`${granjaData.desviacion} `, 105, posicionY);
      doc.text(`Coeficiente de Variacion:`, posicionX, (posicionY += 8));
      doc.text(`${granjaData.cv}% `, 105, posicionY);
      doc.text(`Uniformidad:`, posicionX, (posicionY += 8));
      doc.text(`${granjaData.uniformidad}% `, 105, posicionY );

      //------Captura del grafico----------------

      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let imgWidth = pageWidth - 30; // Dejar un margen de 10 a cada lado
      let imgHeight =
        (granjaData.grafico.height * imgWidth) / granjaData.grafico.width;

      if (imgHeight > pageHeight - 80) {
        // Consideramos márgenes en el PDF
        const scaleFactor = (pageHeight - 80) / imgHeight;
        imgWidth *= scaleFactor;
        imgHeight = pageHeight - 80;
      }

      if (posicionY + imgHeight > pageHeight - 10) {
        doc.addPage(); // Si la imagen no cabe, agregamos una nueva página
        posicionY = 20; // Restablecemos la posición 'y' para la nueva página
      }

      doc.addImage(
        granjaData.grafico.image,
        "PNG",
        15,
        posicionY + 10,
        imgWidth,
        imgHeight
      );
    });
 
    doc.save(
      `${granja.nombre || "Granja"}_${fechaGranja}.pdf`
    );
    reinicio();

// window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.titulo}>Ingreso de Pesos de Bebés</h1>
          <DatosGranja
            granja={granja}
            onDatosChange={actualizarDatosGranja}
            onEnter={moverFocus}
            ref={edadRef}
          />
          <PesoForm
            agregarPeso={agregarPeso}
            editarPeso={editarPeso}
            eliminarPeso={eliminarPeso}
            pesos={pesos}
            agregarPesoCaja={agregarPesoCaja}
            modo={modo}
            setModo={setModo}
            ref={pesoRef}
            bloqueado={bloqueado}
          />
          <MostrarPesos pesos={pesos} />

          <button
            className={styles.buton}
            onClick={calcularEstadisticas}
            disabled={pesos.length <= 2 || bloqueado}
          >
            Calcular Estadísticas
          </button>

          <Estadisticas
            cantidadPesos = {modo === "individual" ? pesos.length : pesosCaja.length}
            promedio={promedio}
            desviacion={desviacion}
            cv={cv}
            uniformidad={uniformidad}
          />
          <Histograma
            pesos={modo === "individual" ? pesos : pesosCaja}
            ref={histogramRef}
          />
          <button
            className={styles.buton}
            onClick={generarPDF}
            disabled={!bloqueado}
            ref={pdfButonRef}
          >
            Generar PDF
          </button>
          <div className={styles.contButton} onClick={() => {if(bloqueado) agregarNuevaGranja()}} >
            <div className={styles.contaButonAgregar}>
              <img
                className={styles.imagen1}
                src="/agregar.png"
                alt="ic_agregar"
              />
            </div>
            <div className={styles.p}>
              <p>Agregar Granja</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
