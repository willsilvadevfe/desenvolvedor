import { useState } from "react";

const BtnApp = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const resetCount = () => {
    count, setCount(0)
  };

  return (
    <div>
      <h3>{count}</h3>
      <button className="btnCount" onClick={incrementCount}>Click para incrementar</button>
      <button className="btnCount" onClick={decrementCount}>Click para decrementar</button>
      <button className="btnCount" onClick={resetCount}>Click para resetar</button>
    </div>
  );
};

export default BtnApp;
