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

// Arquivo onde será salva a configuração
const configPath = path.join(
  app.getPath("userData"),
  "config.json"
);

// ---------------------------------------------------------
// CONFIGURAÇÃO
// ---------------------------------------------------------

function lerConfig() {
  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    return JSON.parse(
      fs.readFileSync(configPath, "utf-8")
    );
  } catch (erro) {
    console.error("Erro ao ler configuração:", erro);

    return {};
  }
}

function salvarConfig(config) {
  try {
    fs.writeFileSync(
      configPath,
      JSON.stringify(config, null, 2),
      "utf-8"
    );
  } catch (erro) {
    console.error("Erro ao salvar configuração:", erro);

    throw erro;
  }
}

// ---------------------------------------------------------
// PASTA RAIZ
// ---------------------------------------------------------

function pastaRaiz() {
  const config = lerConfig();

  // Se o usuário já escolheu uma pasta
  if (config.pastaRaiz) {
    return config.pastaRaiz;
  }

  // Pasta padrão
  return path.join(
    app.getPath("documents"),
    "ALERTA_DA_QUALIDADE"
  );
}

// ---------------------------------------------------------
// JANELA
// ---------------------------------------------------------

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

// ---------------------------------------------------------
// SALVAR PDF
// ---------------------------------------------------------

ipcMain.handle(
  "pdf:salvar",
  async (event, nomeArquivo) => {
    try {
      const hoje = new Date();

      const pasta = path.join(
        pastaRaiz(),
        String(hoje.getFullYear()),
        MESES[hoje.getMonth()]
      );

      // Cria as pastas automaticamente
      fs.mkdirSync(pasta, {
        recursive: true,
      });

      const pdf = await event.sender.printToPDF({
        landscape: true,
        pageSize: "A4",
        printBackground: true,

        margins: {
          marginType: "none",
        },
      });

      const caminho = path.join(
        pasta,
        `${nomeArquivo}.pdf`
      );

      fs.writeFileSync(caminho, pdf);

      return caminho;
    } catch (erro) {
      console.error("Erro ao salvar PDF:", erro);

      throw erro;
    }
  }
);

// ---------------------------------------------------------
// OBTER PASTA ATUAL
// ---------------------------------------------------------

ipcMain.handle("pasta:obter", () => {
  return pastaRaiz();
});

// ---------------------------------------------------------
// ESCOLHER PASTA
// ---------------------------------------------------------

ipcMain.handle(
  "pasta:escolher",
  async (event) => {
    try {
      const janela =
        BrowserWindow.fromWebContents(
          event.sender
        );

      const resultado =
        await dialog.showOpenDialog(janela, {
          title:
            "Escolha a pasta para salvar os PDFs",

          defaultPath: pastaRaiz(),

          properties: [
            "openDirectory",
            "createDirectory",
          ],
        });

      // Usuário cancelou
      if (
        resultado.canceled ||
        !resultado.filePaths[0]
      ) {
        return null;
      }

      const novaPasta =
        resultado.filePaths[0];

      // Salva a nova pasta na configuração
      const config = lerConfig();

      salvarConfig({
        ...config,
        pastaRaiz: novaPasta,
      });

      console.log(
        "Nova pasta configurada:",
        novaPasta
      );

      return novaPasta;
    } catch (erro) {
      console.error(
        "Erro ao escolher pasta:",
        erro
      );

      throw erro;
    }
  }
);

// ---------------------------------------------------------
// ELECTRON
// ---------------------------------------------------------

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});