import { useState } from "react";

const TestUseState = () => {
  const [count, setCount] = useState(0);
  const [x ,setX] = useState(true)
  return (
    <div>
      <h3>useState count button</h3>
      <button onClick={() => setCount(count + 1)}>Count {count}</button>

      <h3>Render page useState</h3>
      <button onClick={() => setX(false) }>Desativar visualização</button>
      <button onClick={() => setX(true) }>Ativar visualização</button>
        {x === true ? (
            <div>
                <p>Visualização da página ativada.</p>
            </div>
        ) : (
            <div>
                <p>Visualização da página desativada.</p>
            </div>
        )}
    </div>
  );
};

export default TestUseState;
