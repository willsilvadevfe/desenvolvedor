import React from "react";
import "./BorazonEquipamento.css";

const BorazonEquipamento = () => {
  return (
    <div>
      <dialog id="modal">
        <h3>Título do Modal</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex facilis,
          totam dignissimos praesentium id fugiat hic! Totam id, facere neque
          maiores distinctio quidem saepe assumenda, ab eligendi dolor sed
          nulla?
        </p>
        <button commandfor="modal" command="close">
          Fechar
        </button>
      </dialog>
      <button commandfor="modal" command="show-modal">
        Clique aqui
      </button>
    </div>
  );
};

export default BorazonEquipamento;
