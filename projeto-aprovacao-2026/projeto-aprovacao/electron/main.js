import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  inserirUsuario,
  listarUsuarios,
  deletarUsuario,
  criarTabelaRejeicoes,
  inserirRejeicao,
  listarRejeicoes,
  verificarUsuario,
  inserirAprovacao,
  listarAprovacoes,
  criarTabelaAprovacoes,
} from "./database.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 768,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });
  win.maximize();
  win.show();

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  createWindow();
  criarTabelaRejeicoes();
  criarTabelaAprovacoes(); // <- garante que a tabela existe antes de qualquer insert/select
});

const configPath = () => path.join(app.getPath("userData"), "config.json");

function lerConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath(), "utf-8"));
  } catch {
    return {};
  }
}

function salvarConfig(cfg) {
  fs.writeFileSync(configPath(), JSON.stringify(cfg, null, 2));
}

// pasta padrão caso o admin ainda não tenha escolhido nenhuma
function pastaAprovacoes() {
  return (
    lerConfig().pastaAprovacoes ||
    path.join(app.getPath("documents"), "aprovacoes")
  );
}

function imprimirImagem(imagemBase64) {
  return new Promise((resolve, reject) => {
    const janelaImpressao = new BrowserWindow({ show: false });

    const htmlImpressao = `
      <html>
        <head>
          <style>
            @page { size: A4 landscape; margin: 10mm; }
            html, body { margin: 0; padding: 0; }
            img { width: 100%; height: auto; display: block; }
          </style>
        </head>
        <body>
          <img src="${imagemBase64}" />
        </body>
      </html>
    `;

    janelaImpressao.webContents.on("did-finish-load", () => {
      janelaImpressao.webContents.print(
        { silent: false, landscape: true, color: false },
        (sucesso, motivoErro) => {
          janelaImpressao.close();
          if (!sucesso && motivoErro !== "cancelled") {
            reject(new Error(motivoErro));
          } else {
            resolve();
          }
        },
      );
    });

    janelaImpressao.webContents.on("did-fail-load", (_e, _code, descricao) => {
      reject(
        new Error(`Falha ao carregar imagem para impressão: ${descricao}`),
      );
    });

    janelaImpressao.loadURL(
      "data:text/html;charset=utf-8," + encodeURIComponent(htmlImpressao),
    );
  });
}

ipcMain.handle("config:obterPasta", () => pastaAprovacoes());

ipcMain.handle("usuario:criar", async (event, { nome, registro, senha }) => {
  return await inserirUsuario(nome, registro, senha);
});

ipcMain.handle("usuario:listar", async () => {
  return await listarUsuarios();
});

ipcMain.handle("usuario:deletar", async (event, { registro }) => {
  return await deletarUsuario(registro);
});

ipcMain.handle("rejeicao:criar", async (event, dadosRejeicao) => {
  return await inserirRejeicao(dadosRejeicao);
});

ipcMain.handle("rejeicao:listar", async () => {
  return await listarRejeicoes();
});

ipcMain.handle("aprovacao:criar", async (event, dadosAprovacao) => {
  return await inserirAprovacao(dadosAprovacao);
});

ipcMain.handle("aprovacao:listar", async () => {
  return await listarAprovacoes();
});

ipcMain.handle("config:escolherPasta", async () => {
  const r = await dialog.showOpenDialog({
    title: "Escolha a pasta das aprovações",
    properties: ["openDirectory", "createDirectory"],
  });
  if (r.canceled) return null;

  const pasta = r.filePaths[0];
  try {
    fs.mkdirSync(pasta, { recursive: true });
    fs.accessSync(pasta, fs.constants.W_OK); // testa permissão de escrita
  } catch {
    return { erro: "Sem permissão de escrita nessa pasta." };
  }

  salvarConfig({ ...lerConfig(), pastaAprovacoes: pasta });
  return { pasta };
});

// gerar e salvar o PDF na pasta configurada
ipcMain.handle("pdf:gerar", async (event, nomeArquivo) => {
  const pasta = pastaAprovacoes();

  const pdf = await event.sender.printToPDF({
    landscape: true,
    pageSize: "A4",
    printBackground: true,
  });

  const destino = path.join(pasta, path.basename(nomeArquivo)); // basename evita path traversal
  fs.writeFileSync(destino, pdf);
  return destino;
});

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function obterPastaDestino() {
  const agora = new Date();
  const ano = String(agora.getFullYear());
  const indice = agora.getMonth();
  const numero = String(indice + 1).padStart(2, "0");

  const pasta = path.join(pastaAprovacoes(), ano, `${numero}-${MESES[indice]}`);
  fs.mkdirSync(pasta, { recursive: true }); // Sync, senão dá erro
  return pasta;
}

console.log("verificarUsuario é:", typeof verificarUsuario);
ipcMain.handle("usuario:verificarLogin", async (event, registro, senha) => {
  try {
    const usuario = await verificarUsuario(registro, senha);
    return usuario;
  } catch (error) {
    console.error("Erro ao verificar login:", error);
    return null;
  }
});

ipcMain.handle("db:baixar", async () => {
  const caminhoOrigem = path.join(app.getPath("userData"), "usuario.db");
  // ajuste para onde seu .db realmente está salvo

  const resultado = await dialog.showSaveDialog({
    defaultPath: "backup-banco.db",
    filters: [{ name: "Banco de dados SQLite", extensions: ["db"] }],
  });

  if (resultado.canceled) return { sucesso: false };

  fs.copyFileSync(caminhoOrigem, resultado.filePath);
  return { sucesso: true, caminho: resultado.filePath };
});

ipcMain.handle(
  "pdf:salvar",
  async (event, { nomeArquivo, pdfBase64, imagemBase64 }) => {
    try {
      const pastaDestino = obterPastaDestino();
      const caminhoCompleto = path.join(pastaDestino, nomeArquivo);

      const base64Limpo = pdfBase64.replace(
        /^data:application\/pdf;filename=generated\.pdf;base64,/,
        "",
      );
      fs.writeFileSync(caminhoCompleto, Buffer.from(base64Limpo, "base64"));

      try {
        await imprimirImagem(imagemBase64);
      } catch (erroImpressao) {
        console.error("Erro ao abrir tela de impressão:", erroImpressao);
      }

      return { sucesso: true, caminho: caminhoCompleto };
    } catch (erro) {
      console.error("Erro ao salvar PDF:", erro);
      return { sucesso: false };
    }
  },
);

console.log("Handler pdf:salvar registrado");

ipcMain.handle("db:exportarCsv", async () => {
  const usuarios = await listarUsuarios();

  const resultado = await dialog.showSaveDialog({
    defaultPath: "usuarios.csv",
    filters: [{ name: "CSV", extensions: ["csv"] }],
  });

  if (resultado.canceled) return { sucesso: false };

  const cabecalho = "id,nome,registro";
  const linhas = usuarios.map(
    (u) => `${u.id},"${u.nome.replace(/"/g, '""')}","${u.registro}"`,
  );
  const conteudoCsv = [cabecalho, ...linhas].join("\r\n");

  // BOM no início evita que acentos fiquem quebrados ao abrir no Excel
  fs.writeFileSync(resultado.filePath, "\uFEFF" + conteudoCsv, "utf-8");

  return { sucesso: true, caminho: resultado.filePath };
});
