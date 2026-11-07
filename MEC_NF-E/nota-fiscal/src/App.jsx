import { useState } from "react";
import { montarPayload, emitirNfse, aguardarNfse } from "./focus.js";
import { gerarPdf } from "./pdf.js";
import { salvarPdf, criarNota } from "./services/api.js";

const env = import.meta.env;
const inicial = {
  prestadorCnpj: env.VITE_PRESTADOR_CNPJ || "",
  prestadorIM: env.VITE_PRESTADOR_IM || "",
  prestadorMunicipio: env.VITE_PRESTADOR_MUNICIPIO_IBGE || "",
  naturezaOperacao: "1",
  optanteSimples: env.VITE_PRESTADOR_SIMPLES !== "false",
  regimeEspecial: "",
  tomadorTipo: "cpf",
  tomadorDoc: "",
  tomadorNome: "",
  tomadorEmail: "",
  tomadorTel: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  tomadorMunicipio: "",
  uf: "SP",
  placa: "",
  modelo: "",
  km: "",
  discriminacao: "",
  valor: "",
  aliquota: "",
  itemLista: "14.01",
  codigoTributario: "",
  cnae: "",
  codigoNacional: "",
  issRetido: false,
};

// "1.234,56" -> 1234.56 | "150.50" -> 150.5 | "150,5" -> 150.5
function paraNumero(texto) {
  const t = String(texto ?? "").trim();
  if (!t) return 0;
  const normal = t.includes(",") ? t.replace(/\./g, "").replace(",", ".") : t;
  return Number(normal) || 0;
}

// Salva o PDF (pasta no Electron / download no navegador) e registra a nota no banco.
// Nunca lança erro: a nota já foi emitida na prefeitura, então só devolvemos um aviso.
async function guardarNota({ form, pdf, resposta, ref }) {
  let caminho = null;
  let aviso = "";
  try {
    const blob =
      pdf instanceof Blob
        ? pdf
        : typeof pdf?.output === "function"
          ? pdf.output("blob")
          : null;

    if (blob) {
      caminho = await salvarPdf(
        `nota-${resposta?.numero ?? Date.now()}.pdf`,
        blob,
      );
    }

    await criarNota({
      cliente: form.tomadorNome,
      documento: form.tomadorDoc,
      placa: form.placa,
      descricao: form.discriminacao,
      valor: paraNumero(form.valor),
      status: "autorizado",
      referencia: String(ref ?? ""),
      pdf_path: caminho,
    });
  } catch (e) {
    aviso = `A nota foi emitida, mas não consegui salvar o registro local: ${e.message}`;
  }
  return { caminho, aviso };
}

function Campo({ label, nome, form, set, tipo = "text", dica, ...resto }) {
  return (
    <label className="campo">
      <span>{label}</span>
      <input
        type={tipo}
        value={form[nome]}
        onChange={(e) => set(nome, e.target.value)}
        {...resto}
      />
      {dica && <small>{dica}</small>}
    </label>
  );
}

function Check({ label, nome, form, set }) {
  return (
    <label className="check">
      <input
        type="checkbox"
        checked={form[nome]}
        onChange={(e) => set(nome, e.target.checked)}
      />
      {label}
    </label>
  );
}

export default function App() {
  const [form, setForm] = useState(inicial);
  const [estado, setEstado] = useState({ fase: "ocioso" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const c = { form, set };

  async function emitir(ev) {
    ev.preventDefault();
    setEstado({ fase: "enviando" });
    try {
      const payload = montarPayload(form);
      const ref = await emitirNfse(payload);
      setEstado({ fase: "processando" });
      const resposta = await aguardarNfse(ref);

      const pdf = await gerarPdf(payload, resposta);
      const { caminho, aviso } = await guardarNota({
        form,
        pdf,
        resposta,
        ref,
      });

      setEstado({ fase: "ok", resposta, caminho, aviso });
    } catch (err) {
      setEstado({ fase: "erro", mensagem: err.message });
    }
  }

  const ocupado = estado.fase === "enviando" || estado.fase === "processando";

  return (
    <main>
      <header>
        <h1>Emitir nota fiscal de serviço</h1>
        <p>Preencha os dados, emita e o PDF é salvo automaticamente.</p>
      </header>

      <form onSubmit={emitir}>
        <fieldset>
          <legend>Cliente</legend>
          <div className="grade">
            <label className="campo">
              <span>Documento</span>
              <select
                value={form.tomadorTipo}
                onChange={(e) => set("tomadorTipo", e.target.value)}
              >
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
              </select>
            </label>
            <Campo
              label="Número do documento"
              nome="tomadorDoc"
              required
              {...c}
            />
            <Campo
              label="Nome ou razão social"
              nome="tomadorNome"
              required
              {...c}
            />
            <Campo label="E-mail" nome="tomadorEmail" tipo="email" {...c} />
            <Campo label="Telefone" nome="tomadorTel" {...c} />
          </div>
          <div className="grade">
            <Campo label="CEP" nome="cep" required {...c} />
            <Campo label="Rua" nome="logradouro" required {...c} />
            <Campo label="Número" nome="numero" required {...c} />
            <Campo label="Complemento" nome="complemento" {...c} />
            <Campo label="Bairro" nome="bairro" required {...c} />
            <Campo
              label="Código IBGE da cidade"
              nome="tomadorMunicipio"
              required
              {...c}
              dica="7 dígitos. Ex.: São José dos Campos é 3549904"
            />
            <Campo label="UF" nome="uf" maxLength={2} required {...c} />
          </div>
        </fieldset>

        <fieldset>
          <legend>Veículo</legend>
          <div className="grade">
            <Campo label="Placa" nome="placa" {...c} />
            <Campo label="Modelo" nome="modelo" {...c} />
            <Campo label="KM" nome="km" {...c} />
          </div>
          <small>Esses dados entram no fim da descrição do serviço.</small>
        </fieldset>

        <fieldset>
          <legend>Serviço executado</legend>
          <label className="campo cheio">
            <span>Descrição do serviço</span>
            <textarea
              rows={4}
              required
              value={form.discriminacao}
              onChange={(e) => set("discriminacao", e.target.value)}
            />
          </label>
          <div className="grade">
            <Campo
              label="Valor do serviço (R$)"
              nome="valor"
              required
              inputMode="decimal"
              {...c}
            />
            <Campo
              label="Alíquota do ISS (%)"
              nome="aliquota"
              inputMode="decimal"
              {...c}
            />
            <Campo
              label="Item da lista de serviço"
              nome="itemLista"
              required
              {...c}
              dica="Mecânica costuma ser 14.01. Confirme com o contador."
            />
            <Campo
              label="Código tributário do município"
              nome="codigoTributario"
              {...c}
              dica="Só se a prefeitura exigir"
            />
            <Campo
              label="CNAE"
              nome="cnae"
              {...c}
              dica="Só se a prefeitura exigir"
            />
            <Campo
              label="Cód. tributação nacional"
              nome="codigoNacional"
              {...c}
              dica="Só para padrão nacional"
            />
          </div>
          <Check label="ISS retido pelo cliente" nome="issRetido" {...c} />
        </fieldset>

        <details>
          <summary>Dados da empresa e tributação</summary>
          <fieldset>
            <div className="grade">
              <Campo
                label="CNPJ da mecânica"
                nome="prestadorCnpj"
                required
                {...c}
              />
              <Campo
                label="Inscrição municipal"
                nome="prestadorIM"
                required
                {...c}
              />
              <Campo
                label="Código IBGE da cidade da mecânica"
                nome="prestadorMunicipio"
                required
                {...c}
              />
              <label className="campo">
                <span>Natureza da operação</span>
                <select
                  value={form.naturezaOperacao}
                  onChange={(e) => set("naturezaOperacao", e.target.value)}
                >
                  <option value="1">1 - Tributação no município</option>
                  <option value="2">2 - Tributação fora do município</option>
                  <option value="3">3 - Isenção</option>
                  <option value="4">4 - Imune</option>
                  <option value="5">
                    5 - Exigibilidade suspensa (judicial)
                  </option>
                  <option value="6">
                    6 - Exigibilidade suspensa (administrativa)
                  </option>
                </select>
              </label>
              <label className="campo">
                <span>Regime especial</span>
                <select
                  value={form.regimeEspecial}
                  onChange={(e) => set("regimeEspecial", e.target.value)}
                >
                  <option value="">Nenhum</option>
                  <option value="1">1 - Microempresa municipal</option>
                  <option value="2">2 - Estimativa</option>
                  <option value="3">3 - Sociedade de profissionais</option>
                  <option value="4">4 - Cooperativa</option>
                  <option value="5">5 - MEI</option>
                  <option value="6">6 - ME/EPP</option>
                </select>
              </label>
            </div>
            <Check
              label="Empresa optante pelo Simples Nacional"
              nome="optanteSimples"
              {...c}
            />
          </fieldset>
        </details>

        {estado.fase === "erro" && (
          <pre className="aviso erro" role="alert">
            {estado.mensagem}
          </pre>
        )}
        {estado.fase === "ok" && (
          <div className="aviso ok" role="status">
            Nota {estado.resposta?.numero} emitida.{" "}
            {estado.caminho
              ? `PDF salvo em ${estado.caminho}.`
              : "PDF baixado."}
            {estado.resposta?.url && (
              <>
                {" "}
                <a href={estado.resposta.url} target="_blank" rel="noreferrer">
                  Ver na prefeitura
                </a>
              </>
            )}
          </div>
        )}
        {estado.fase === "ok" && estado.aviso && (
          <pre className="aviso erro" role="alert">
            {estado.aviso}
          </pre>
        )}

        <button type="submit" disabled={ocupado}>
          {estado.fase === "enviando"
            ? "Enviando nota…"
            : estado.fase === "processando"
              ? "Aguardando a prefeitura…"
              : "Emitir nota e gerar PDF"}
        </button>
      </form>
    </main>
  );
}
