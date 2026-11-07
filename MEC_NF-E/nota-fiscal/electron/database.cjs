const Database = require("better-sqlite3");
const path = require("path");

let db;

function iniciar(userDataPath) {
  db = new Database(path.join(userDataPath, "mecanica.db"));
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS notas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      documento TEXT,
      placa TEXT,
      descricao TEXT,
      valor REAL NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pendente',
      referencia TEXT,
      pdf_path TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    );
  `);
}

function inserirNota(n) {
  const info = db
    .prepare(
      `INSERT INTO notas (cliente, documento, placa, descricao, valor, status, referencia, pdf_path)
       VALUES (@cliente, @documento, @placa, @descricao, @valor, @status, @referencia, @pdf_path)`
    )
    .run({
      cliente: n.cliente,
      documento: n.documento ?? null,
      placa: n.placa ?? null,
      descricao: n.descricao ?? null,
      valor: Number(n.valor) || 0,
      status: n.status ?? "pendente",
      referencia: n.referencia ?? null,
      pdf_path: n.pdf_path ?? null,
    });
  return { id: Number(info.lastInsertRowid) };
}

function listarNotas() {
  return db.prepare("SELECT * FROM notas ORDER BY id DESC").all();
}

module.exports = { iniciar, inserirNota, listarNotas };
