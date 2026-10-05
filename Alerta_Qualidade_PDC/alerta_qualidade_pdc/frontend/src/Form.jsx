import { useRef, useState, useEffect } from "react";
import Logo from "../img/logo_pdc.png";
import "./Root.css";
import "./Form.css";
import AlertaPdf from "./AlertaPdf";
import AtaPdf from "./AtaPdf";
import toast, { Toaster } from "react-hot-toast";

const INITIAL_FORM = {
  cliente: "",
  partNumber: "",
  falha: "",
  local: "",
  elaborador: "",
  aprovador: "",
  descricao: "",
};

const INITIAL_IMAGES = { aprovada: null, reprovada: null };

/* Remove caracteres inválidos para nome de arquivo no Windows */
const limpar = (txt) =>
  String(txt)
    .replace(/[\\/:*?"<>|]/g, "")
    .trim();

/* ---------- Campo de upload de imagem ---------- */
const ImageUpload = ({ caption, tone, image, onSelect, onRemove }) => {
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) onSelect(file);
  };

  return (
    <figure className={`img-card img-card--${tone}`}>
      <label
        className={`dropzone ${image ? "dropzone--filled" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleFile(e.target.files[0]);
            e.target.value = ""; // permite escolher o mesmo arquivo de novo
          }}
        />
        {image ? (
          <img src={image.url} alt={caption} />
        ) : (
          <span className="dropzone-text">
            <strong>Adicionar foto</strong>
            <small>Clique ou arraste a imagem aqui</small>
          </span>
        )}
      </label>

      {image && (
        <button type="button" className="btn-link no-print" onClick={onRemove}>
          Remover imagem
        </button>
      )}

      <figcaption>{caption}</figcaption>
    </figure>
  );
};

/* ---------- Página ---------- */
const Form = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [images, setImages] = useState(INITIAL_IMAGES);
  const [gerando, setGerando] = useState(false);
  const [pastaBase, setPastaBase] = useState("");
  const [pastaAtual, setPastaAtual] = useState("");
  const temElectron = typeof window.api?.escolherPasta === "function";

  // Busca no Electron qual é a pasta de salvamento atual
  useEffect(() => {
    if (typeof window.api?.obterPasta === "function") {
      window.api.obterPasta().then(setPastaAtual).catch(console.error);
    }
  }, []);
  // Mantém sempre a versão mais recente das imagens (para revogar URLs)
  const imagesRef = useRef(images);
  imagesRef.current = images;

  // Libera as URLs de preview ao sair da página
  useEffect(
    () => () => {
      Object.values(imagesRef.current).forEach(
        (img) => img && URL.revokeObjectURL(img.url),
      );
    },
    [],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (key, file) => {
    // Libera a URL antiga da imagem que está sendo trocada/removida
    const old = imagesRef.current[key];
    if (old) URL.revokeObjectURL(old.url);

    // Cria a nova URL fora do setState para não duplicar em StrictMode
    const next = file ? { file, url: URL.createObjectURL(file) } : null;
    setImages((prev) => ({ ...prev, [key]: next }));
  };

  const handleClear = () => {
    Object.values(imagesRef.current).forEach(
      (img) => img && URL.revokeObjectURL(img.url),
    );
    setForm(INITIAL_FORM);
    setImages(INITIAL_IMAGES);
    toast.success("Formulário limpo com sucesso!");
  };

  const handleEscolherPasta = async () => {
    try {
      const pasta = await window.api.escolherPasta();

      if (pasta) {
        setPastaAtual(pasta);
        console.log("Pasta escolhida:", pasta);
      }
    } catch (erro) {
      console.error("Erro ao alterar pasta:", erro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.cliente ||
      !form.partNumber ||
      !form.falha ||
      !form.local ||
      !form.elaborador ||
      !form.aprovador ||
      !form.descricao
    ) {
      toast.error(
        "Atenção! Todos os campos do formulário devem ser preenchidos para gerar o alerta.",
      );
      return;
    }

    if (!images.aprovada || !images.reprovada) {
      toast.error(
        "Adicione as duas fotos (aprovada e reprovada) para gerar o alerta.",
      );
      return;
    }

    // Fora do Electron (navegador comum): usa a impressão normal
    if (typeof window.api?.salvarPdf !== "function") {
      const originalTitle = document.title;
      document.title = `Alerta da Qualidade - ${form.cliente} - ${form.partNumber}`;
      window.addEventListener(
        "afterprint",
        () => {
          document.title = originalTitle;
        },
        { once: true },
      );
      window.print();
      return;
    }

    // Dentro do Electron: salva o PDF direto em
    // Documentos > ALERTA_DA_QUALIDADE > ano > mês
    if (gerando) return;
    setGerando(true);

    const nome = `alerta_${limpar(form.cliente)}_${limpar(form.partNumber)}_${Date.now()}`;

    try {
      
      const caminho = await window.api.salvarPdf(nome);
      console.log("PDF salvo em:", caminho);
      toast.success(`PDF salvo com sucesso!\n\nLocal:\n${caminho}`, {
        duration: 10000,
        style: {
          width: "600px",
          maxWidth: "90vw",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          fontSize: "14px",
          lineHeight: "1.5",
          padding: "18px 20px",
        },
      });

      // Pequena pausa para o aviso aparecer antes de abrir a impressão
      await new Promise((resolve) => setTimeout(resolve, 400));
      window.print();
    } catch (erro) {
      console.error("Erro ao salvar PDF:", erro);
      toast.error(`Não foi possível salvar o PDF: ${erro?.message ?? erro}`);
    } finally {
      setGerando(false);
    }

    // TODO (backend): enviar `form` + `images` para a API e salvar no banco.
  };

  return (
    <>
      {/* Tela do formulário (escondida na impressão) */}
      <div className="page tela-formulario">
        <header className="page-header">
          <img className="img-logo" src={Logo} alt="Logo PDC" width={100} />
          <div className="header-text">
            <h1>Sistema de Gestão para Alertas da Qualidade</h1>
            <p>
              Acompanhamento de ocorrências, desvios e ações que requerem
              atenção.
            </p>
          </div>
          <div
            className="theme-switch no-print"
            role="radiogroup"
            aria-label="Tema da página"
          >
            <input
              className="sr-only"
              type="radio"
              name="theme"
              id="theme-light"
            />
            <label className="theme-light" htmlFor="theme-light">
              Claro
            </label>
            <input
              className="sr-only"
              type="radio"
              name="theme"
              id="theme-dark"
            />
            <label className="theme-dark" htmlFor="theme-dark">
              Escuro
            </label>
          </div>
        </header>

        <form className="page-body" onSubmit={handleSubmit}>
          {/* Área de informações do alerta */}
          <section className="card info-area">
            <h2>Dados do alerta</h2>

            <div className="fields">
              <label className="field">
                <span>Cliente</span>
                <input
                  type="text"
                  name="cliente"
                  value={form.cliente}
                  onChange={handleChange}
                  placeholder="Ex.: Eaton"
                />
              </label>

              <label className="field">
                <span>Part Number</span>
                <input
                  type="text"
                  name="partNumber"
                  value={form.partNumber}
                  onChange={handleChange}
                  placeholder="Ex.: V6005"
                />
              </label>

              <label className="field">
                <span>Tipo de falha</span>
                <input
                  type="text"
                  name="falha"
                  value={form.falha}
                  onChange={handleChange}
                  placeholder="Ex.: Marca de rebolo na ponta"
                />
              </label>

              <label className="field">
                <span>Área detectada</span>
                <input
                  type="text"
                  name="local"
                  value={form.local}
                  onChange={handleChange}
                  placeholder="Ex.: Quality Gate"
                />
              </label>

              <label className="field">
                <span>Elaborador</span>
                <input
                  type="text"
                  name="elaborador"
                  value={form.elaborador}
                  onChange={handleChange}
                  placeholder="Ex.: Eliane Santos"
                />
              </label>

              <label className="field">
                <span>Auditor aprovador</span>
                <input
                  type="text"
                  name="aprovador"
                  value={form.aprovador}
                  onChange={handleChange}
                  placeholder="Nome do aprovador"
                />
              </label>

              <label className="field field--wide">
                <span>Descrição da falha detectada</span>
                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  placeholder="Descreva a não conformidade"
                  rows={4}
                />
              </label>
            </div>
          </section>

          {/* Área de imagens (centro da página) */}
          <section className="card container-img">
            <h2>Evidências com imagens</h2>

            <div className="img-grid">
              <ImageUpload
                tone="approved"
                caption="Condição do produto em conformidade com a qualidade"
                image={images.aprovada}
                onSelect={(file) => handleImage("aprovada", file)}
                onRemove={() => handleImage("aprovada", null)}
              />
              <ImageUpload
                tone="reject"
                caption="Condição de produto não conforme com a qualidade"
                image={images.reprovada}
                onSelect={(file) => handleImage("reprovada", file)}
                onRemove={() => handleImage("reprovada", null)}
              />
            </div>

            {/* Pasta de salvamento dos PDFs */}
            <div className="pasta-box no-print">
              <div className="pasta-info">
                <span className="pasta-label">
                  Pasta de salvamento dos PDFs
                </span>
                <code className="pasta-caminho">
                  {temElectron
                    ? pastaAtual || "Carregando..."
                    : "Disponível apenas no aplicativo Electron"}
                </code>
              </div>
              <button
                onClick={handleEscolherPasta}
                className="btn btn--secondary"
              >
                Escolher pasta
              </button>
            </div>

            {/* Ações */}
            <div className="btns no-print">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleClear}
              >
                Limpar formulário
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={gerando}
              >
                {gerando ? "Gerando..." : "Gerar alerta de qualidade"}
              </button>
            </div>
          </section>
        </form>
      </div>

      {/* Folhas do PDF (A4 paisagem) — escondidas na tela, só aparecem na impressão */}
      <div className="folhas-impressao">
        <AlertaPdf form={form} images={images} />
        <AtaPdf form={form} />
      </div>
    </>
  );
};

export default Form;
