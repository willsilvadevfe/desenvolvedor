const formulario = document.getElementById("setup-form");
const limparFormulario = document.getElementById("btn-limpar");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const partnumber = document.getElementById("partnumber").value.trim();
  const linha = document.getElementById("linha").value;
  const equipamento = document.getElementById("equipamento").value;
  const ecnumber = document.getElementById("ecnumber").value.trim();

  if (!tipo || !partnumber || !linha || !equipamento || !ecnumber) {
    return;
  } else {
    console.log("Enviado com sucesso..");
  }
});

limparFormulario.addEventListener("click", function (event) {
  event.preventDefault();

  formulario.reset();

  document.getElementById("tipo").focus();
});
