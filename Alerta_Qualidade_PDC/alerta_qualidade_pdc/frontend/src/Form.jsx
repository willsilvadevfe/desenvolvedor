import { useRef, useState, useEffect } from "react";
import Logo from "../img/logo_pdc.png";
import toast, { Toaster } from "react-hot-toast";
import "./Root.css";
import "./Form.css";
import AlertaPdf from "./AlertaPdf";

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
    const other = key === "aprovada" ? "reprovada" : "aprovada";

    // Libera a URL antiga da imagem que está sendo trocada/removida
    const old = imagesRef.current[key];
    if (old) URL.revokeObjectURL(old.url);

    // Cria a nova URL fora do setState para não duplicar em StrictMode
    const next = file ? { file, url: URL.createObjectURL(file) } : null;
    setImages((prev) => ({ ...prev, [key]: next }));

    // Toast só quando as duas imagens ficam completas
    if (next && imagesRef.current[other]) {
      toast.success("Upload das imagens realizado com sucesso!");
    }
  };

  const handleClear = () => {
    Object.values(imagesRef.current).forEach(
      (img) => img && URL.revokeObjectURL(img.url),
    );
    setForm(INITIAL_FORM);
    setImages(INITIAL_IMAGES);
    toast.success("Formulário limpo com sucesso!");
  };

  const handleSubmit = (e) => {
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

    // O PDF sai pela impressão do navegador ("Salvar como PDF"), usando a
    // folha <AlertaPdf /> (A4 paisagem). O nome do arquivo sugerido vem do
    // título da aba.
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

    // TODO (backend): enviar `form` + `images` para a API e salvar no banco.
  };

  return (
    <>
      <Toaster position="top-right" />

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

            {/* Ações */}
            <div className="btns no-print">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleClear}
              >
                Limpar formulário
              </button>
              <button type="submit" className="btn btn--primary">
                Gerar alerta de qualidade
              </button>
            </div>
          </section>
        </form>
      </div>

      {/* Folha do PDF (A4 paisagem) — só aparece na impressão */}
      <AlertaPdf form={form} images={images} />
    </>
  );
};

export default Form;
