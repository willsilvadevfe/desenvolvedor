import { formatarDataBR } from "../utils/formatarData";
import { calcularStatus, obterInfoStatus } from "../utils/statusCalibracao";

const CABECALHO = [
  "Responsável",
  "Codigo",
  "Data de Calibracao",
  "Data de Vencimento",
  "Linha",
  "Equipamento",
  "Caracteristica",
  "Etiqueta Legivel",
  "Status",
];

// Coloca um campo entre aspas quando ele contém vírgula, aspas ou
// quebra de linha — é a regra padrão do formato CSV. Sem isso, um
// código de objeto com vírgula, por exemplo, "quebraria" as colunas.
function escaparCampo(valor) {
  const texto = String(valor ?? "");
  if (texto.includes(",") || texto.includes('"') || texto.includes("\n")) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

function montarLinha(registro) {
  const info = obterInfoStatus(calcularStatus(registro.dataVencimento));

  return [
    registro.nome,
    registro.codigoObjeto,
    registro.dataCalibracao,
    registro.dataVencimento,
    registro.tipoObjeto,
    registro.setor,
    registro.responsavel,
    registro.etiquetaLegivel === true
      ? "Sim"
      : registro.etiquetaLegivel === false
        ? "Não"
        : "",
    info.label,
  ]
    .map(escaparCampo)
    .join(",");
}
// Monta o texto completo do CSV a partir da lista de registros.
export function gerarConteudoCSV(registros) {
  const linhas = [CABECALHO.join(","), ...registros.map(montarLinha)];
  // \r\n é a quebra de linha padrão esperada pelo Excel no Windows.
  return linhas.join("\r\n");
}

// Gera um nome de arquivo único baseado na data/hora atual.
// Ex: relatorio_calibracao_2026-08-15_21-30.csv
export function gerarNomeArquivo() {
  const agora = new Date();
  const dois = (numero) => String(numero).padStart(2, "0");
  const data = `${agora.getFullYear()}-${dois(agora.getMonth() + 1)}-${dois(agora.getDate())}`;
  const hora = `${dois(agora.getHours())}-${dois(agora.getMinutes())}`;
  return `relatorio_calibracao_${data}_${hora}.csv`;
}

// Função "principal" do serviço: gera o conteúdo, o nome do arquivo
// e o Blob (arquivo em memória) uma única vez. O mesmo Blob é
// reaproveitado tanto para o download quanto para o anexo do e-mail,
// então a lógica de geração não fica duplicada em nenhum lugar.
export function gerarArquivoCSV(registros) {
  const conteudo = gerarConteudoCSV(registros);
  const nomeArquivo = gerarNomeArquivo();

  // O caractere BOM (Byte Order Mark) no início do arquivo avisa o
  // Excel que o conteúdo está em UTF-8, evitando que acentos como
  // "ç" e "ã" apareçam quebrados ao abrir o CSV.
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + conteudo], { type: "text/csv;charset=utf-8;" });

  return { blob, nomeArquivo, conteudo };
}

// Dispara o download do arquivo no navegador do usuário.
export function baixarCSV(blob, nomeArquivo) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
