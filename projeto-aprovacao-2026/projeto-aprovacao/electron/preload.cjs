const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  criarUsuario: (dados) => ipcRenderer.invoke("usuario:criar", dados),
  listarUsuarios: () => ipcRenderer.invoke("usuario:listar"),
  deletarUsuario: (registro) =>
    ipcRenderer.invoke("usuario:deletar", { registro }),
  baixarBanco: () => ipcRenderer.invoke("db:baixar"),
  exportarUsuariosCsv: () => ipcRenderer.invoke("db:exportarCsv"),
  criarRejeicao: (dados) => ipcRenderer.invoke("rejeicao:criar", dados),
  listarRejeicoes: () => ipcRenderer.invoke("rejeicao:listar"),
  verificarLogin: (registro, senha) =>
    ipcRenderer.invoke("usuario:verificarLogin", registro, senha),
  salvarPdfAprovacao: (payload) => ipcRenderer.invoke("pdf:salvar", payload),
  criarAprovacao: (dados) => ipcRenderer.invoke("aprovacao:criar", dados),
  listarAprovacao: () => ipcRenderer.invoke("aprovacao:listar"),
});
