import { jsPDF } from "jspdf";

const brl = (v) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function gerarPdf(payload, resposta) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const linha = (rotulo, valor) => {
    if (!valor) return;
    doc.setFont("helvetica", "bold").setFontSize(9).text(rotulo, 15, y);
    doc
      .setFont("helvetica", "normal")
      .text(String(valor), 55, y, { maxWidth: 140 });
    y += 6;
  };
  const secao = (titulo) => {
    y += 3;
    doc.setFont("helvetica", "bold").setFontSize(11).text(titulo, 15, y);
    doc.line(15, y + 1.5, 195, y + 1.5);
    y += 8;
  };

  doc
    .setFont("helvetica", "bold")
    .setFontSize(16)
    .text("Nota Fiscal de Serviço Eletrônica (NFS-e)", 15, y);
  y += 8;
  linha("Número", resposta.numero);
  linha("Cód. verificação", resposta.codigo_verificacao);
  linha(
    "Emissão",
    new Date(
      payload.data_emissao.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"),
    ).toLocaleString("pt-BR"),
  );

  const p = payload.prestador;
  secao("Prestador");
  linha("CNPJ", p.cnpj);
  linha("Inscrição municipal", p.inscricao_municipal);

  const t = payload.tomador;
  const e = t.endereco || {};
  secao("Tomador");
  linha("Nome", t.razao_social);
  linha(t.cpf ? "CPF" : "CNPJ", t.cpf || t.cnpj);
  linha("E-mail", t.email);
  linha("Telefone", t.telefone);
  linha(
    "Endereço",
    [e.logradouro, e.numero, e.complemento, e.bairro, e.uf, e.cep]
      .filter(Boolean)
      .join(", "),
  );

  const s = payload.servico;
  secao("Serviço");
  const linhasDescricao = doc.splitTextToSize(s.discriminacao || "", 180);
  doc
    .setFont("helvetica", "normal")
    .setFontSize(9)
    .text(linhasDescricao, 15, y);
  y += linhasDescricao.length * 5 + 2;
  linha("Item da lista", s.item_lista_servico);
  linha("Alíquota ISS", s.aliquota !== undefined ? `${s.aliquota}%` : "");
  linha("ISS retido", s.iss_retido ? "Sim" : "Não");

  secao("Valor");
  doc
    .setFont("helvetica", "bold")
    .setFontSize(14)
    .text(brl(s.valor_servicos), 15, y);
  y += 12;

  if (resposta.url) {
    doc
      .setFont("helvetica", "normal")
      .setFontSize(8)
      .text(`Consulta oficial: ${resposta.url}`, 15, y, { maxWidth: 180 });
  }
  return doc.output("blob");
}
