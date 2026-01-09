import { useState } from "react";

const ManageData = () => {
  const [state, setState] = useState(0);

  return (
    <>
      <h2>Utilizando useState</h2>
      <p>
        Contagem: <strong>{state}</strong>
      </p>
      <button onClick={() => setState(state + 1)}>Clique para somar + 1</button>
      <button onClick={() => setState(state - 1)}>
        Clique para subtrair - 1
      </button>
      <button onClick={() => setState(0)}>Clique para voltar ao inicio</button>
    </>
  );
};

export default ManageData;
