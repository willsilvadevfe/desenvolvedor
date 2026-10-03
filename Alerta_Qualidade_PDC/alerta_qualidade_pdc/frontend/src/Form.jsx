import { useEffect, useRef, useState } from "react";
import Logo from "../img/logo_pdc.png";
import toast, { Toaster } from "react-hot-toast";
import "./Root.css";
import "./Form.css";

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
  const [error, setError] = useState("");

  // Libera as URLs de preview ao sair da página
  const imagesRef = useRef(images);
  imagesRef.current = images;
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
    if (images[key]) URL.revokeObjectURL(images[key].url);
    setImages({
      ...images,
      [key]: file ? { file, url: URL.createObjectURL(file) } : null,
    });

    setError("");
  };

  const handleClear = () => {
    Object.values(images).forEach((img) => img && URL.revokeObjectURL(img.url));
    setForm(INITIAL_FORM);
    setImages(INITIAL_IMAGES);
    setError("");
    toast.success("Formulário limpo com sucesso!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!images.aprovada || !images.reprovada) {
      setError(
        toast.error(
          "Adicione as duas fotos (aprovada e reprovada) para gerar o alerta.",
        ),
      );
      return;
    }
    setError("");

    // Por enquanto o PDF sai pela impressão do navegador ("Salvar como PDF").
    // O nome do arquivo sugerido vem do título da aba.
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
    <div className="page">
      <header className="page-header">
        <img className="img-logo" src={Logo} alt="Logo PDC" width={100} />
        <div className="header-text">
          <h1>Sistema de Gestão para Alertas da Qualidade</h1>
          <p>
            Acompanhamento de ocorrências, desvios e ações que requerem atenção.
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
                required
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
                required
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
                required
              />
            </label>

            <label className="field">
              <span>Local da falha</span>
              <input
                type="text"
                name="local"
                value={form.local}
                onChange={handleChange}
                placeholder="Ex.: Quality Gate"
                required
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
                required
              />
            </label>

            <label className="field">
              <span>Aprovador</span>
              <input
                type="text"
                name="aprovador"
                value={form.aprovador}
                onChange={handleChange}
                placeholder="Nome do aprovador"
                required
              />
            </label>

            <label className="field field--wide">
              <span>Descrição da falha</span>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Descreva a não conformidade"
                rows={4}
                required
              />
            </label>
          </div>
        </section>

        {/* Área de imagens (centro da página) */}
        <section className="card container-img">
          <h2>Evidências</h2>

          <div className="img-grid">
            <ImageUpload
              tone="approved"
              caption="Condição de produto aprovado - Peça física"
              image={images.aprovada}
              onSelect={(file) => handleImage("aprovada", file)}
              onRemove={() => handleImage("aprovada", null)}
            />
            <ImageUpload
              tone="reject"
              caption="Condição de produto reprovado - Peça física"
              image={images.reprovada}
              onSelect={(file) => handleImage("reprovada", file)}
              onRemove={() => handleImage("reprovada", null)}
            />
          </div>
          <div className="btns no-print">
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
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
        

        

        {/* Ações */}
        
      </form>
    </div>
  );
};

export default Form;
