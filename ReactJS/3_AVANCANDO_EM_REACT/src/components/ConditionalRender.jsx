import { useState } from "react";

const ConditionalRender = () => {
  const [x] = useState(true);

  return (
    <div>
      <h3>Renderização de elementos</h3>
      {x === true ? (
        <div>
          <p>Condição true, elemento sendo renderizado...</p>
        </div>
      ) : (
        <div>
          <p>Não encontrado...</p>
        </div>
      )}
    </div>
  );
};

export default ConditionalRender;
