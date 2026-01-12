import { useState } from "react";

const ConditionalRender = () => {
  const [x] = useState(true); //useState recebe true

  const [name] = useState("Willian")
  return (
    <div>
      <h3>Isso será exibido?</h3>
      {x && <p>Exibindo... true</p>} {/*Usar operador and (&&) e jsx para retorno de exibição */}
      <h3>If condicional</h3>
      {name === "Willian" ? (
        <div>
            <p>Seu nome é Willian.</p>
        </div>
      ) : (
        <div>
            <p>Nome não encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default ConditionalRender;
