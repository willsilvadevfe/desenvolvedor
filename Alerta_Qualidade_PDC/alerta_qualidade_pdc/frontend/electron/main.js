import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// Em ESM não existe __dirname pronto, então criamos ele aqui
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function criarJanela() {
  const janela = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true, // isola o React do Node (segurança)
      nodeIntegration: false, // React não usa Node direto
    },
  });

  if (app.isPackaged) {
    // App já empacotado: carrega o site buildado
    janela.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    // Desenvolvimento: carrega o servidor do Vite
    janela.loadURL("http://localhost:5173");
  }
}

app.whenReady().then(() => {
  criarJanela();

  // macOS: recria a janela ao clicar no ícone se não houver nenhuma
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) criarJanela();
  });
});

// Fecha o app quando todas as janelas fecharem (exceto no macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});