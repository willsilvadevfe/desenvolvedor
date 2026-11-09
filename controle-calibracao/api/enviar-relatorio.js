import nodemailer from "nodemailer";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_NOME_ARQUIVO = /^[\w-]+\.csv$/;
const LIMITE_CSV = 1_000_000; // ~1 MB de texto
const NOME_ARQUIVO_PADRAO = "relatorio_calibracao.csv";

const ASSUNTO = "Auditoria de Calibração - Relatório CSV";

const CORPO_HTML = `
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #222; line-height: 1.6; max-width: 600px;">
  <p>Olá,</p>
  <p>
    Segue em anexo o <strong>relatório de controle de calibração</strong>
    em formato CSV, gerado ao final da auditoria.
  </p>

  <h3 style="margin: 24px 0 8px;">Como abrir o arquivo no Excel</h3>
  <ol>
    <li>Baixe o arquivo CSV anexo a este e-mail e salve em uma pasta do computador.</li>
    <li>Abra o <strong>Microsoft Excel</strong> com uma planilha em branco.</li>
    <li>
      Na aba <strong>Dados</strong>, clique em <strong>De Texto/CSV</strong>
      (em algumas versões: <strong>Obter Dados → De Arquivo → De Texto/CSV</strong>).
    </li>
    <li>Selecione o arquivo salvo e clique em <strong>Importar</strong>.</li>
    <li>
      Na janela de pré-visualização, confira se a origem do arquivo está em
      <strong>65001: Unicode (UTF-8)</strong> e o delimitador em <strong>Vírgula</strong>.
    </li>
    <li>Clique em <strong>Carregar</strong>. Os dados aparecerão organizados em colunas.</li>
  </ol>
  <p style="font-size: 13px; color: #555;">
    <strong>Dica:</strong> se, ao dar duplo clique no arquivo, todos os dados
    aparecerem juntos em uma única coluna, use o passo a passo acima.
  </p>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;">

  <p style="font-size: 13px; color: #555;">
    <strong>Sobre este sistema:</strong> o Controle de Calibração é um projeto
    de estudos, desenvolvido por Willian Silva para praticar React e Node.js em
    um caso de uso real: registrar instrumentos, acompanhar o vencimento das
    calibrações e gerar um relatório em CSV. Sugestões e feedbacks são bem-vindos.
    Código e perfil:
    <a href="https://github.com/willsilvadevfe">github.com/willsilvadevfe</a>
  </p>
  <p style="font-size: 12px; color: #888;">
    Esta é uma mensagem automática enviada pelo sistema.
  </p>
</div>
`;

const CORPO_TEXTO = `Olá,

Segue em anexo o relatório de controle de calibração em formato CSV.

Como abrir o arquivo no Excel:
1. Baixe o arquivo CSV anexo e salve em uma pasta do computador.
2. Abra o Microsoft Excel com uma planilha em branco.
3. Na aba Dados, clique em "De Texto/CSV".
4. Selecione o arquivo salvo e clique em "Importar".
5. Confira se a origem está em UTF-8 e o delimitador em Vírgula.
6. Clique em "Carregar".

Sobre este sistema: o Controle de Calibração é um projeto de estudos, desenvolvido por Willian Silva para praticar React e Node.js. Código: https://github.com/willsilvadevfe

Esta é uma mensagem automática enviada pelo sistema.`;

// Lista de e-mails autorizados a receber o relatório, vinda da variável
// de ambiente EMAILS_PERMITIDOS (separados por vírgula). A conferência é
// feita aqui no servidor porque o select do front pode ser contornado.
const PERMITIDOS = (process.env.EMAILS_PERMITIDOS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export default async function handler(req, res) {
  // 1. Só aceita POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, erro: "Método não permitido" });
  }

  // 2. Lê o que o front enviou
  const { destinatario, csv, nomeArquivo } = req.body ?? {};

  // 3. Valida
  if (
    typeof destinatario !== "string" ||
    !REGEX_EMAIL.test(destinatario) ||
    /[,;]/.test(destinatario)
  ) {
    return res.status(400).json({ ok: false, erro: "Destinatário inválido" });
  }

  // Lista vazia é erro de configuração do servidor, não do usuário.
  if (PERMITIDOS.length === 0) {
    console.error("Variável EMAILS_PERMITIDOS não configurada");
    return res
      .status(500)
      .json({ ok: false, erro: "Servidor mal configurado" });
  }

  if (!PERMITIDOS.includes(destinatario.trim().toLowerCase())) {
    return res
      .status(403)
      .json({ ok: false, erro: "Destinatário não autorizado" });
  }

  if (typeof csv !== "string" || csv.length === 0 || csv.length > LIMITE_CSV) {
    return res.status(400).json({ ok: false, erro: "Conteúdo CSV inválido" });
  }

  // Nome do arquivo vem do front: só aceita um formato seguro,
  // senão usa o nome padrão.
  const nomeSeguro =
    typeof nomeArquivo === "string" && REGEX_NOME_ARQUIVO.test(nomeArquivo)
      ? nomeArquivo
      : NOME_ARQUIVO_PADRAO;

  // 4. Garante que as credenciais existem no servidor
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Variáveis EMAIL_USER/EMAIL_PASS não configuradas");
    return res
      .status(500)
      .json({ ok: false, erro: "Servidor mal configurado" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 5. Envia (assunto e corpo fixos, definidos aqui no servidor)
  try {
    await transporter.sendMail({
      from: `"Controle de Calibração" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: ASSUNTO,
      html: CORPO_HTML,
      text: CORPO_TEXTO,
      attachments: [
        {
          filename: nomeSeguro,
          // BOM no início para o Excel reconhecer os acentos (UTF-8)
          content: "\uFEFF" + csv,
          contentType: "text/csv; charset=utf-8",
        },
      ],
    });

    return res.status(200).json({ ok: true });
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    return res.status(500).json({ ok: false, erro: "Falha ao enviar e-mail" });
  }
}
