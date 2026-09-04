import "./AdminConfig.css";
import { useRef, useState, useEffect, useCallback } from "react";
import LoginUser from "./LoginUser";
import { Route } from "react-router-dom";

const AdminConfig = () => {
  const modalRef = useRef(null);
  const nomeRef = useRef(null);
  const registroRef = useRef(null);
  const senhaRef = useRef(null);
  const registroDeletarRef = useRef(null);

  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroDeletar, setErroDeletar] = useState("");
  const [deletando, setDeletando] = useState(false);

  const carregarUsuarios = useCallback(async () => {
    setCarregando(true);
    try {
      const lista = await window.api.listarUsuarios();
      setUsuarios(lista);
    } catch (err) {
      console.error("Erro ao listar usuários:", err);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  function abrirModal() {
    setErro("");
    modalRef.current.showModal();
  }

  function fecharModal() {
    modalRef.current.close();
  }

  const modalRefDeletar = useRef(null);

  function abrirModalDeletar() {
    modalRefDeletar.current.showModal();
  }

  async function handleDeletarUsuario(e) {
    e.preventDefault();
    setErroDeletar("");

    const registro = registroDeletarRef.current.value.trim();
    if (!registro) {
      setErroDeletar("Digite um registro.");
      return;
    }

    setDeletando(true);
    try {
      await window.api.deletarUsuario(registro);
      e.target.reset();
      fecharModalDeletar();
      carregarUsuarios(); // atualiza a tabela
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      setErroDeletar(
        err.message.includes("USUARIO_NAO_ENCONTRADO")
          ? "Nenhum usuário encontrado com esse registro."
          : "Erro ao deletar usuário.",
      );
    } finally {
      setDeletando(false);
    }
  }

  function fecharModalDeletar() {
    modalRefDeletar.current.close();
  }

  async function handleAdicionarUsuario(e) {
    e.preventDefault();
    setErro("");

    const nome = nomeRef.current.value.trim();
    const registro = registroRef.current.value.trim();
    const senha = senhaRef.current.value;

    if (!nome || !registro || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    setEnviando(true);
    try {
      const resultado = await window.api.criarUsuario({
        nome,
        registro,
        senha,
      });
      console.log("Usuário criado:", resultado);

      e.target.reset();
      fecharModal();
      carregarUsuarios(); // atualiza a tabela com o novo usuário
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      setErro(
        err.message.includes("UNIQUE")
          ? "Esse registro já está em uso."
          : "Erro ao adicionar usuário.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="admin-config-container">
      <a className="exit-icon" href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#000000"
        >
          <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
        </svg>
      </a>

      <div className="admin-config-title-sub">
        <h1>Configurações do Administrador</h1>
        <p>Aqui você pode gerenciar os usuários do sistema.</p>
      </div>

      <div className="admin-config-actions">
        <button className="cd-btn cd-btn-primary" onClick={abrirModal}>
          Adicionar Usuário
        </button>
        <button className="cd-btn cd-btn-danger" onClick={abrirModalDeletar}>
          Deletar Usuário
        </button>
      </div>

      <table className="cd-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Registro</th>
          </tr>
        </thead>
        <tbody>
          {carregando && (
            <tr>
              <td colSpan={3}>Carregando...</td>
            </tr>
          )}
          {!carregando && usuarios.length === 0 && (
            <tr>
              <td colSpan={3}>Nenhum usuário cadastrado.</td>
            </tr>
          )}
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.registro}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={modalRefDeletar} className="cd-modal cd-modal-danger">
        <h2 className="cd-modal-title">Deletar</h2>
        <small className="cd-modal-subtitle">Deletar usuário no sistema.</small>

        <form onSubmit={handleDeletarUsuario}>
          <div className="cd-form-group">
            <label htmlFor="registroDeletar">Registro</label>
            <input
              type="text"
              id="registroDeletar"
              ref={registroDeletarRef}
              required
            />
          </div>

          {erroDeletar && <p className="cd-form-erro">{erroDeletar}</p>}

          <div className="cd-modal-actions">
            <button
              type="button"
              className="cd-btn cd-btn-ghost"
              onClick={fecharModalDeletar}
            >
              Fechar
            </button>
            <input
              className="cd-btn cd-btn-danger"
              type="submit"
              value={deletando ? "Deletando..." : "Deletar"}
              disabled={deletando}
            />
          </div>
        </form>
      </dialog>

      <dialog ref={modalRef} className="cd-modal">
        <h2 className="cd-modal-title">Adicionar</h2>
        <small className="cd-modal-subtitle">
          Adicionar novo usuário no sistema.
        </small>

        <form onSubmit={handleAdicionarUsuario}>
          <div className="cd-form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" ref={nomeRef} required />
          </div>

          <div className="cd-form-group">
            <label htmlFor="registro">Registro</label>
            <input type="text" id="registro" ref={registroRef} required />
          </div>

          <div className="cd-form-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" ref={senhaRef} required />
          </div>

          {erro && <p className="cd-form-erro">{erro}</p>}

          <div className="cd-modal-actions">
            <button
              type="button"
              className="cd-btn cd-btn-ghost"
              onClick={fecharModal}
            >
              Fechar
            </button>
            <input
              className="cd-btn cd-btn-primary"
              type="submit"
              value={enviando ? "Adicionando..." : "Adicionar"}
              disabled={enviando}
            />
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AdminConfig;
