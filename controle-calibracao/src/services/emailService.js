import emailjs from '@emailjs/browser';

// As credenciais do EmailJS nunca ficam escritas no código.
// Elas vêm do arquivo .env (veja .env.example) e são injetadas pelo
// Vite em tempo de build através de import.meta.env.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Envia o relatório de calibração por e-mail, com o CSV como anexo.
// Recebe o resumo (números do relatório) e o Blob do CSV já gerado
// pelo csvService — não gera o arquivo de novo aqui.
export async function enviarRelatorioPorEmail({ resumo, csvBlob, nomeArquivo }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'Configuração do EmailJS ausente. Verifique as variáveis no arquivo .env.'
    );
  }

  // O EmailJS aceita um File/Blob diretamente como valor de um campo
  // do template, desde que esse campo esteja configurado como
  // "Attachment" no painel do EmailJS (veja o passo a passo no README).
  const arquivoCSV = new File([csvBlob], nomeArquivo, { type: 'text/csv' });

  const parametrosDoTemplate = {
    data_relatorio: resumo.data,
    horario_relatorio: resumo.horario,
    total_instrumentos: resumo.total,
    total_validos: resumo.validos,
    total_alerta: resumo.alerta,
    total_vencidos: resumo.vencidos,
    nome_arquivo: nomeArquivo,
    anexo_csv: arquivoCSV,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, parametrosDoTemplate, {
    publicKey: PUBLIC_KEY,
  });
}
