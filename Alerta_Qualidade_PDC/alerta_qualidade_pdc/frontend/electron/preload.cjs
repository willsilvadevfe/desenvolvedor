const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  salvarPdf: (nome) => ipcRenderer.invoke("pdf:salvar", nome),

  obterPasta: () => ipcRenderer.invoke("pasta:obter"),

  escolherPasta: () => ipcRenderer.invoke("pasta:escolher"),
});
