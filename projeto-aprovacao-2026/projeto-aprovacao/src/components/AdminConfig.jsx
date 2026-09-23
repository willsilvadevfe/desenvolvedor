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
  const [pasta, setPasta] = useState("");

  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroDeletar, setErroDeletar] = useState("");
  const [deletando, setDeletando] = useState(false);

  useEffect(() => {
    window.api.obterPastaAprovacoes().then(setPasta);
  }, []);

  async function alterarPasta() {
    const r = await window.api.escolherPastaAprovacoes();
    if (!r) return; // cancelou
    if (r.erro) return Swal.fire("Erro", r.erro, "error");
    setPasta(r.pasta);
  }

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

  async function handleBaixarBanco() {
    const res = await window.api.baixarBanco();
    if (res.sucesso) alert("Backup salvo em: " + res.caminho);
  }

  async function handleExportarCsv() {
    const res = await window.api.exportarUsuariosCsv();
    if (res.sucesso) alert("CSV exportado em: " + res.caminho);
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
      <div className="down-sqlite">
        <div className="download-db">
          {/* BANCO DE DADOS */}
          <h3>Download Banco de Dados - Setup Qualidade </h3>
          <p>Clique no ícone abaixo para iniciar o download do arquivo</p>
          <svg
            onClick={handleExportarCsv}
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#000000"
          >
            <path d="M480-315.33 284.67-510.67l47.33-48L446.67-444v-356h66.66v356L628-558.67l47.33 48L480-315.33ZM226.67-160q-27 0-46.84-19.83Q160-199.67 160-226.67V-362h66.67v135.33h506.66V-362H800v135.33q0 27-19.83 46.84Q760.33-160 733.33-160H226.67Z" />
          </svg>
          <small>
            O arquivo será baixado em formato CSV. Após o download, abra o
            Excel,
            <br /> acesse a aba <strong>Dados</strong>, selecione{" "}
            <strong>Carregar Dados</strong> e importe o arquivo baixado.
          </small>
        </div>
        {/* CAMINHO PDFS */}
        <div className="download-db">
          <h3>Alteração de armazenamento PDF'S </h3>
          <p>{pasta}</p>
          <svg
            onClick={alterarPasta}
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#000000"
          >
            <path d="M554.83-61.54q-21.5-21.54-21.5-51.79 0-21.67 11-39.34 11-17.66 29-26.66V-415q-18-9-29-26.17-11-17.16-11-38.52 0-30.64 21.56-52.14t51.84-21.5q30.27 0 51.77 21.54Q680-510.25 680-480q0 21.67-11 38.83Q658-424 640-415v128.33l173.33-57.66V-415q-18-9-29-26.17-11-17.16-11-38.52 0-30.64 21.56-52.14t51.84-21.5q30.27 0 51.77 21.54Q920-510.25 920-480q0 21.67-11 38.83Q898-424 880-415v118.6l-240 79.73v37.34q18 9 29 26.66 11 17.67 11 39.03Q680-83 658.44-61.5T606.61-40q-30.28 0-51.78-21.54ZM146.67-160v-573.33V-160Zm0 0q-27 0-46.84-20.17Q80-200.33 80-226.67v-506.66q0-26.34 19.83-46.5Q119.67-800 146.67-800H414l66.67 66.67h332.66q27.5 0 47.09 19.58Q880-694.17 880-666.67H453l-66.67-66.66H146.67v506.66h320V-160h-320Z" />
          </svg>
          <small>
            Altere o caminho dos arquivos somente se necessário, alterações podem<br /> dificultar o rastreio dos arquivos gerados.
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
