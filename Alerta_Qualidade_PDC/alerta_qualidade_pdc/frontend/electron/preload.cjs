const { contextBridge } = require("electron");

// Por enquanto a ponte está vazia; nas próximas etapas vamos
// colocar aqui as funções de salvar PDF e escolher pasta.
contextBridge.exposeInMainWorld("api", {});