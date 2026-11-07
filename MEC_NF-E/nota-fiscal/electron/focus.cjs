// Integração com a Focus NFe (exemplo). Roda no processo main para
// evitar CORS e não expor o token no front-end.
// Confira na documentação do provedor o payload exato da sua cidade.

const BASE =
  process.env.FOCUS_AMBIENTE === "producao"
    ? "https://api.focusnfe.com.br"
    : "https://homologacao.focusnfe.com.br";

function authHeader() {
  const token = process.env.FOCUS_TOKEN;
  if (!token) throw new Error("FOCUS_TOKEN não configurado no arquivo .env");
  return "Basic " + Buffer.from(token + ":").toString("base64");
}

async function emitirNfse({ referencia, payload }) {
  const ref = referencia || `nf-${Date.now()}`;
  const res = await fetch(`${BASE}/v2/nfse?ref=${encodeURIComponent(ref)}`, {
    method: "POST",
    headers: { Authorization: authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const resposta = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, referencia: ref, resposta };
}

async function consultarNfse(referencia) {
  const res = await fetch(`${BASE}/v2/nfse/${encodeURIComponent(referencia)}`, {
    headers: { Authorization: authHeader() },
  });
  const resposta = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, referencia, resposta };
}

module.exports = { emitirNfse, consultarNfse };
