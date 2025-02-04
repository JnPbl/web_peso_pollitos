 /* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import styles from './Histograma.module.css';
import {useMemo} from 'react'

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Histograma = ({ pesos }) => {

  const frecuencias = useMemo(() => {
    const conteo = {};
    pesos.forEach((peso) => {
      conteo[peso] = conteo[peso] ? conteo[peso] + 1 : 1;
    });
    return conteo;
  }, [pesos]);


  const data = {
    labels: Object.keys(frecuencias), // Etiquetas de cada entrada
    datasets: [
      {
        label: 'Pesos de Bebé',
        data: Object.values(frecuencias), // Los datos para el histograma
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgb(6, 28, 28)',
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true, // Asegura que el gráfico sea responsivo
    plugins: {
      title: {
        display: true, // Mostrar título
        text: 'PESOS DE BB', // Texto del título
        font: {
          size: 25, // Tamaño de la fuente
          weight: 'bold', // Peso de la fuente (opcional)
        },
        padding: {
          top: 20, // Espacio arriba del título
          bottom: 10, // Espacio abajo del título
        },
      },
      tooltip: {
        enabled: true, // Habilitar tooltips (descripción al pasar el ratón)
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Iniciar el eje X desde cero
      },
      y: {
        beginAtZero: true, // Iniciar el eje Y desde cero
      },
    },
  };

  return (
    <div className={styles.container}>
      <Bar data={data} options={options} />
    </div>
  )
};

export default Histograma;
