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

  const modalRefDeletar = useRef(null);

  function abrirModalDeletar() {
    modalRefDeletar.current.showModal();
  }

  function fecharModalDeletar() {
    modalRefDeletar.current.close();
  }

  return (
    <div className="admin-config-container">
      <h1 className="admin-config-title">Configurações do Administrador</h1>

      <p className="admin-config-subtitle">
        Aqui você pode gerenciar os usuários do sistema.
      </p>

      <div className="admin-config-actions">
        <button className="cd-btn cd-btn-primary" onClick={abrirModal}>
          Adicionar Usuário
        </button>
        <button className="cd-btn cd-btn-danger" onClick={abrirModalDeletar}>
          Deletar Usuário
        </button>
      </div>

      <dialog ref={modalRefDeletar} className="cd-modal cd-modal-danger">
        <h2 className="cd-modal-title">Deletar</h2>
        <small className="cd-modal-subtitle">Deletar usuário no sistema.</small>

        <div className="cd-form-group">
          <label htmlFor="idDeletar">ID</label>
          <input type="number" id="idDeletar" required/>
        </div>

        <div className="cd-modal-actions">
          <button className="cd-btn cd-btn-ghost" onClick={fecharModalDeletar}>
            Fechar
          </button>
          <button className="cd-btn cd-btn-danger">Deletar</button>
        </div>
      </dialog>

      <dialog ref={modalRef} className="cd-modal">
        <h2 className="cd-modal-title">Adicionar</h2>
        <small className="cd-modal-subtitle">
          Adicionar novo usuário no sistema.
        </small>

        <div className="cd-form-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" required/>
        </div>

        <div className="cd-form-group">
          <label htmlFor="id">ID</label>
          <input type="number" id="id" />
        </div>

        <div className="cd-form-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" required/>
        </div>

        <div className="cd-modal-actions">
          <button className="cd-btn cd-btn-ghost" onClick={fecharModal}>
            Fechar
          </button>
          <input
            className="cd-btn cd-btn-primary"
            type="submit"
            value="Adicionar"
          />
        </div>
      </dialog>
    </div>
  );
};

export default AdminConfig;
