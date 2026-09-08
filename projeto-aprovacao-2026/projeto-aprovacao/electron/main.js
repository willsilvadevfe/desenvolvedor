import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { inserirUsuario, listarUsuarios, deletarUsuario } from "./database.cjs"; // <- deletarUsuario aqui

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
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

ipcMain.handle('db:exportarCsv', async () => {
  const usuarios = await listarUsuarios();

  const resultado = await dialog.showSaveDialog({
    defaultPath: 'usuarios.csv',
    filters: [{ name: 'CSV', extensions: ['csv'] }],
  });

  if (resultado.canceled) return { sucesso: false };

  const cabecalho = 'id,nome,registro';
  const linhas = usuarios.map(u =>
    `${u.id},"${u.nome.replace(/"/g, '""')}","${u.registro}"`
  );
  const conteudoCsv = [cabecalho, ...linhas].join('\r\n');

  // BOM no início evita que acentos fiquem quebrados ao abrir no Excel
  fs.writeFileSync(resultado.filePath, '\uFEFF' + conteudoCsv, 'utf-8');

  return { sucesso: true, caminho: resultado.filePath };
});