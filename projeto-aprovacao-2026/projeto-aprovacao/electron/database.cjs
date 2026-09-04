const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { app } = require("electron");

const dbPath = path.join(app.getPath("userData"), "usuario.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao abrir o banco:", err.message);
  } else {
    console.log("Banco conectado em:", dbPath);
    criarTabela();
  }
});

function criarTabela() {
  db.run(
    `
      CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        registro TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      )
    `,
    (err) => {
      if (err) console.error("Erro ao criar tabela:", err.message);
    },
  );
}

function inserirUsuario(nome, registro, senha) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO usuario (nome, registro, senha) VALUES (?, ?, ?)",
      [nome, registro, senha],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, nome, registro });
      },
    );
  });
}

function listarUsuarios() {
  return new Promise((resolve, reject) => {
    db.all("SELECT id, nome, registro FROM usuario", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function deletarUsuario(registro) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id FROM usuario WHERE registro = ?",
      [registro],
      (err, row) => {
        if (err) return reject(err);

        if (!row) {
          // não existe -> rejeita com um erro específico pra tratar no front
          return reject(new Error("USUARIO_NAO_ENCONTRADO"));
        }

        db.run(
          "DELETE FROM usuario WHERE registro = ?",
          [registro],
          function (err) {
            if (err) return reject(err);
            resolve({ registro, deletado: true });
          }
        );
      }
    );
  });
}

module.exports = { inserirUsuario, listarUsuarios, deletarUsuario };

