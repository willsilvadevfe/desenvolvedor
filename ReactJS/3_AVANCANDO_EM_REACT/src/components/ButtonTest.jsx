import React, { useState } from "react";

const ButtonTest = () => {
  const [count, setCount] = useState(0);
  const [att, setAtt] = useState(true);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count {count}</button>
      {att === true ? (
        <div>
            <p>Verdadeiro</p>
        </div>
      ) : (
        <div>
            <p>Falso</p>
        </div>
      )}
    </div>
  );
};

export default ButtonTest;
