const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  criarUsuario: (dados) => ipcRenderer.invoke("usuario:criar", dados),
  listarUsuarios: () => ipcRenderer.invoke("usuario:listar"),
  deletarUsuario: (registro) => ipcRenderer.invoke("usuario:deletar", { registro }),
});
