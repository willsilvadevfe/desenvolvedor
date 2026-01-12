import { useState } from "react";

const TesteComponent = () => {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <h2>Treinando estado useState</h2>
      <p>Contador: {number}</p>
      <button onClick={() => setNumber(number + 1)}>Acrescentar ao contador</button>
    </div>
  );
};

export default TesteComponent;
