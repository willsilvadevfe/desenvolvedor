const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Notas
  criarNota: (nota) => ipcRenderer.invoke("nota:criar", nota),
  listarNotas: () => ipcRenderer.invoke("nota:listar"),

  // PDF
  salvarPdf: (dados) => ipcRenderer.invoke("pdf:salvar", dados),
  mostrarNaPasta: (caminho) => ipcRenderer.invoke("pdf:mostrarNaPasta", caminho),

  // Config
  getPastaPdfs: () => ipcRenderer.invoke("config:pastaPdfs"),
  selecionarPasta: () => ipcRenderer.invoke("config:selecionarPasta"),

  // API de nota fiscal
  emitirNfse: (dados) => ipcRenderer.invoke("nf:emitir", dados),
  consultarNfse: (referencia) => ipcRenderer.invoke("nf:consultar", referencia),
});
