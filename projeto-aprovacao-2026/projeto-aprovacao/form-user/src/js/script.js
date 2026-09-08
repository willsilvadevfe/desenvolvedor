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
    Swal.fire({
      title: "Campos obrigatórios",
      html: `
    <div style="
      font-family: 'Space Grotesk', sans-serif;
      color: #545b62;
      font-size: 14px;
      line-height: 1.6;
      margin-top: 4px;
    ">
      Preencha todos os campos antes de<br>
      enviar sua solicitação.
    </div>
  `,

      icon: "warning",
      iconColor: "#f59e0b",

      width: "min(420px, calc(100% - 32px))",
      padding: "28px",

      background: "#ffffff",
      color: "#0a0a0a",

      confirmButtonText: "Entendi",
      confirmButtonColor: "#1d4ed8",

      buttonsStyling: true,

      showCloseButton: true,
      closeButtonHtml: "&times;",
      focusConfirm: true,

      customClass: {
        popup: "swal2-popup-custom",
        title: "swal2-title-custom",
        confirmButton: "swal2-confirm-custom",
      },

      didOpen: () => {
        const popup = Swal.getPopup();
        const title = Swal.getTitle();
        const button = Swal.getConfirmButton();

        // Popup
        popup.style.borderRadius = "16px";
        popup.style.boxShadow = "0 20px 50px rgba(10, 10, 10, 0.16)";

        // Título
        title.style.fontFamily = "'Space Grotesk', sans-serif";
        title.style.fontSize = "21px";
        title.style.fontWeight = "600";
        title.style.letterSpacing = "-0.02em";
        title.style.marginBottom = "4px";

        // Botão
        button.style.borderRadius = "6px";
        button.style.padding = "11px 26px";
        button.style.fontFamily = "'Space Grotesk', sans-serif";
        button.style.fontSize = "14px";
        button.style.fontWeight = "600";
        button.style.border = "none";
        button.style.boxShadow = "0 5px 12px rgba(29, 78, 216, 0.22)";
      },
    });
    return;
  } else {
    alert("Tudo certo");
  }
});

limparFormulario.addEventListener("click", function (event) {
  event.preventDefault();

  formulario.reset();

  document.getElementById("tipo").focus();
});
