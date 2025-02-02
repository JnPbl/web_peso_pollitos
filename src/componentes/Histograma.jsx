 /* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Histograma = ({ pesos }) => {
  const data = {
    labels: pesos.map((_, idx) => `Peso ${idx + 1}`), // Etiquetas de cada entrada
    datasets: [
      {
        label: 'Pesos de Bebé',
        data: pesos, // Los datos para el histograma
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />; // Renderiza el gráfico de barras
};

export default Histograma;
