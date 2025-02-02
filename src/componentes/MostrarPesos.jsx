
 /* eslint-disable react/prop-types */
const MostrarPesos = ({ pesos }) => {
  return (
    <div>
      <h2>Pesos Ingresados</h2>
      <ul>
        {pesos.map((peso, index) => (
          <li key={index}>{index + 1}- {peso}</li>
        ))}
      </ul>
    </div>
  );
};

export default MostrarPesos;
