// Camada única de acesso: funciona no Electron (window.api) e também
// no navegador (npm run dev), com fallback simples para testes de interface.

const isElectron = typeof window !== "undefined" && !!window.api;
const LS_KEY = "notas_teste";

function blobParaBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function salvarPdf(nomeArquivo, pdfBlob) {
  if (isElectron) {
    const base64 = await blobParaBase64(pdfBlob);
    return window.api.salvarPdf({ nomeArquivo, base64 }); // retorna o caminho salvo
  }
  // Navegador: baixa o arquivo
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  a.click();
  URL.revokeObjectURL(url);
  return null;
}

export async function criarNota(nota) {
  if (isElectron) return window.api.criarNota(nota);
  const lista = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  const nova = { id: Date.now(), ...nota };
  lista.unshift(nova);
  localStorage.setItem(LS_KEY, JSON.stringify(lista));
  return { id: nova.id };
}

export async function listarNotas() {
  if (isElectron) return window.api.listarNotas();
  return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
}

export async function emitirNfse(dados) {
  if (!isElectron) {
    throw new Error("A emissão de NF só funciona no Electron (evita CORS e protege o token).");
  }
  return window.api.emitirNfse(dados);
}

export async function consultarNfse(referencia) {
  if (!isElectron) throw new Error("Disponível apenas no Electron.");
  return window.api.consultarNfse(referencia);
}

export async function getPastaPdfs() {
  return isElectron ? window.api.getPastaPdfs() : null;
}

export async function selecionarPasta() {
  return isElectron ? window.api.selecionarPasta() : null;
}
