import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { inserirUsuario, listarUsuarios, deletarUsuario } from "./database.cjs"; // <- deletarUsuario aqui

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);

ipcMain.handle("usuario:criar", async (event, { nome, registro, senha }) => {
  return await inserirUsuario(nome, registro, senha);
});

ipcMain.handle("usuario:listar", async () => {
  return await listarUsuarios();
});

ipcMain.handle("usuario:deletar", async (event, { registro }) => {
  // <- esse aqui
  return await deletarUsuario(registro);
});
