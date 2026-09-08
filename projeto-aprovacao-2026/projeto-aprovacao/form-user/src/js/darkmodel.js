(function () {
  "use strict";

  var STORAGE_KEY = "registro-setup-tema";
  var root = document.documentElement;
  var toggleBtn = document.getElementById("theme-toggle");

  function aplicarTema(tema) {
    root.setAttribute("data-theme", tema);
    toggleBtn.setAttribute(
      "aria-label",
      tema === "dark" ? "Ativar modo claro" : "Ativar modo escuro",
    );
  }

  function temaInicial() {
    var salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo === "dark" || salvo === "light") return salvo;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  aplicarTema(temaInicial());

  toggleBtn.addEventListener("click", function () {
    var atual = root.getAttribute("data-theme");
    var proximo = atual === "dark" ? "light" : "dark";
    aplicarTema(proximo);
    localStorage.setItem(STORAGE_KEY, proximo);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (evento) {
      if (localStorage.getItem(STORAGE_KEY)) return;
      aplicarTema(evento.matches ? "dark" : "light");
    });
})();
