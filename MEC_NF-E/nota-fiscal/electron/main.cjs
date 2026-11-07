const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const db = require("./database.cjs");
const focus = require("./focus.cjs");

const DEV_URL = "http://localhost:5173";
const MESES = [
  "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

let win;

/* ---------- config.json (pasta dos PDFs) ---------- */
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

function pastaPdfs() {
  return lerConfig().pastaPdfs || path.join(app.getPath("documents"), "NotasFiscais");
}

/* ---------- Janela ---------- */
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.maximize();
  win.show();

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  } else {
    win.loadURL(DEV_URL);
  }
}

/* ---------- IPC ---------- */
function registrarIpc() {
  // Notas (SQLite)
  ipcMain.handle("nota:criar", (_e, nota) => db.inserirNota(nota));
  ipcMain.handle("nota:listar", () => db.listarNotas());

  // PDF: recebe base64 do renderer e grava em <pasta>/<ano>/<mes>/arquivo.pdf
  ipcMain.handle("pdf:salvar", (_e, { nomeArquivo, base64 }) => {
    const agora = new Date();
    const pasta = path.join(
      pastaPdfs(),
      String(agora.getFullYear()),
      MESES[agora.getMonth()]
    );
    fs.mkdirSync(pasta, { recursive: true });

    const nomeSeguro = path.basename(nomeArquivo || `nota-${Date.now()}.pdf`);
    const destino = path.join(pasta, nomeSeguro);
    fs.writeFileSync(destino, Buffer.from(base64, "base64"));
    return destino;
  });

  ipcMain.handle("pdf:mostrarNaPasta", (_e, caminho) => {
    shell.showItemInFolder(caminho);
  });

  // Configuração
  ipcMain.handle("config:pastaPdfs", () => pastaPdfs());
  ipcMain.handle("config:selecionarPasta", async () => {
    const r = await dialog.showOpenDialog(win, { properties: ["openDirectory"] });
    if (r.canceled || !r.filePaths[0]) return null;
    salvarConfig({ ...lerConfig(), pastaPdfs: r.filePaths[0] });
    return r.filePaths[0];
  });

  // API de nota fiscal (token fica no processo main)
  ipcMain.handle("nf:emitir", (_e, dados) => focus.emitirNfse(dados));
  ipcMain.handle("nf:consultar", (_e, referencia) => focus.consultarNfse(referencia));
}

app.whenReady().then(() => {
  db.iniciar(app.getPath("userData"));
  registrarIpc();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
