import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.maximize();
  win.show();
  win.loadURL("http://localhost:5173");
}

// Salva o PDF em ALERTA_DA_QUALIDADE/ANO/mês
ipcMain.handle("pdf:salvar", async (event, nomeArquivo) => {
  const hoje = new Date();
  const pasta = path.join(
    app.getPath("documents"),
    "ALERTA_DA_QUALIDADE",
    String(hoje.getFullYear()),
    MESES[hoje.getMonth()],
  );
  fs.mkdirSync(pasta, { recursive: true });

  const pdf = await event.sender.printToPDF({
    landscape: true,
    pageSize: "A4",
    printBackground: true,
    margins: { marginType: "none" },
  });

  const caminho = path.join(pasta, `${nomeArquivo}.pdf`);
  fs.writeFileSync(caminho, pdf);
  return caminho;
});

ipcMain.handle("pasta:obter", () => pastaRaiz());

ipcMain.handle("pasta:escolher", async (event) => {
  const janela = BrowserWindow.fromWebContents(event.sender);
  const resultado = await dialog.showOpenDialog(janela, {
    title: "Escolha a pasta para salvar os PDFs",
    defaultPath: pastaRaiz(),
    properties: ["openDirectory", "createDirectory"],
  });
  if (resultado.canceled || !resultado.filePaths[0]) return null;

  const nova = resultado.filePaths[0];
  salvarConfig({ ...lerConfig(), pastaRaiz: nova });
  return nova;
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
