import "./AdminConfig.css";
import { useRef } from "react";

const AdminConfig = () => {
  const modalRef = useRef(null);

  function abrirModal() {
    modalRef.current.showModal();
  }

  function fecharModal() {
    modalRef.current.close();
  }

  return (
    <div className="admin-config-container">
      <h1 className="admin-config-title">Configurações do Administrador</h1>

      <p>Aqui você pode gerenciar os usuários do sistema.</p>

      <button onClick={abrirModal}>Adicionar Usuário</button>

      <dialog ref={modalRef}>
        <h2>Adicionar</h2>
        <small>Adicionar novo usuário no sistema.</small>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" />
        <label htmlFor="id">ID</label>
        <input
          type="number"
          id="id"
        />
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
        />
        <input type="submit" value="Adicionar" />
        <button onClick={fecharModal}>Fechar</button>
      </dialog>
    </div>
  );
};

export default AdminConfig;
