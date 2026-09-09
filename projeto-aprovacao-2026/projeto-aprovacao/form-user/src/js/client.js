import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: troque pelos valores do seu projeto (Supabase > Settings > API)
const SUPABASE_URL = "https://sqdxhjlqsjqrrvhhjjzz.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZHhoamxxc2pxcnJ2aGhqanp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5MDgyMjksImV4cCI6MjEwNDQ4NDIyOX0.Jxy4wH449iv1aRGhYmVqFpEkrlRbDS7KXeb0iINQU30";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("setup-form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const dados = {
    tipo: form.tipo.value,
    partnumber: Number(form.partnumber.value),
    linha: form.linha.value,
    equipamento: form.equipamento.value || null,
    ecnumber: form.ecnumber.value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  const { error } = await supabase.from("formularios").insert([dados]);

  submitBtn.disabled = false;
  submitBtn.textContent = "Enviar solicitação";

  if (error) {
    console.error(error);
    mostrarFeedback(
      "Erro ao enviar. Verifique a conexão e tente novamente.",
      "erro",
    );
    return;
  }

  mostrarFeedback("Solicitação enviada com sucesso!", "sucesso");
  form.reset();
});

function mostrarFeedback(texto, tipo) {
  let el = document.getElementById("form-feedback");
  if (!el) {
    el = document.createElement("p");
    el.id = "form-feedback";
    form.appendChild(el);
  }
  el.textContent = texto;
  el.className = "feedback feedback--" + tipo;
}
