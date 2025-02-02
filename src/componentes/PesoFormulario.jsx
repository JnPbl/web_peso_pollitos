import { useState } from 'react'

 /* eslint-disable react/prop-types */
const PesoForm = ({ agregarPeso }) => {
  const [peso, setPeso] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (peso) {
      agregarPeso(parseFloat(peso));
      setPeso('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        placeholder="Ingresa el peso"
        required
      />
      <button type="submit">Agregar Peso</button>
    </form>
  );
};

export default PesoForm;
