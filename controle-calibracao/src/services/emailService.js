// Envia o relatório de calibração por e-mail, com o CSV como anexo.
// O envio em si é feito pelo servidor (api/enviar-relatorio.js, com
// Nodemailer), então nenhuma credencial de e-mail fica no navegador.
// Recebe o Blob do CSV já gerado pelo csvService — não gera o arquivo
// de novo aqui.
export async function enviarRelatorioPorEmail({
  csvBlob,
  nomeArquivo,
  destinatario,
}) {
  // O servidor recebe o CSV como texto dentro de um JSON.
  // (O BOM do início é removido pelo .text(); o servidor o adiciona
  // de volta antes de anexar, para o Excel reconhecer os acentos.)
  const csv = await csvBlob.text();

  // Caminho relativo: em desenvolvimento o proxy do Vite repassa para
  // o servidor local e, em produção, a Vercel atende a pasta /api.
  const resposta = await fetch("/api/enviar-relatorio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destinatario, csv, nomeArquivo }),
  });

  // Se o servidor cair ou devolver algo que não seja JSON, o catch
  // evita que o erro de parse esconda o problema real.
  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok || !dados.ok) {
    throw new Error(dados.erro || "Falha ao enviar e-mail");
  }

  return dados;
}