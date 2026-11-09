import express from "express";
import handler from "./api/enviar-relatorio.js";

const app = express();

// O Express limita o corpo a 100 KB por padrão. Como o CSV pode chegar
// a ~1 MB, sobe o limite (a Vercel já faz isso sozinha em produção).
app.use(express.json({ limit: "2mb" }));

app.post("/api/enviar-relatorio", handler);

app.listen(3001, () => {
  console.log("API local rodando em http://localhost:3001");
});
