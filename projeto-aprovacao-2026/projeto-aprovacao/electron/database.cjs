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

// database.cjs

function verificarUsuario(registro, senha) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id, nome, registro FROM usuario WHERE registro = ? AND senha = ?";
    db.get(sql, [registro, senha], (err, row) => {
      if (err) {
        reject(err);
      } else {
        // row será undefined se não encontrar ninguém com esse registro/senha
        resolve(row || null);
      }
    });
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
          },
        );
      },
    );
  });
}

function criarTabelaRejeicoes() {
  db.run(`CREATE TABLE IF NOT EXISTS rejeicoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    partnumber TEXT,
    linha TEXT,
    equipamento TEXT,
    registro TEXT,
    motivo TEXT,
    data_rejeicao TEXT DEFAULT (datetime('now','localtime'))
  )`);
}

function inserirRejeicao({
  tipo,
  partnumber,
  linha,
  equipamento,
  registro,
  motivo,
}) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO rejeicoes (tipo, partnumber, linha, equipamento, registro, motivo)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [tipo, partnumber, linha, equipamento, registro, motivo],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      },
    );
  });
}

function listarRejeicoes() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM rejeicoes ORDER BY data_rejeicao DESC`,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
}

function criarTabelaAprovacoes() {
  db.run(`CREATE TABLE IF NOT EXISTS aprovacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    operacao TEXT,
    valvula TEXT,
    linha TEXT,
    data TEXT,
    hora TEXT,
    auditor TEXT
  )`);
}

function inserirAprovacao({ operacao, valvula, linha, data, hora, auditor }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO aprovacoes (operacao, valvula, linha, data, hora, auditor)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [operacao, valvula, linha, data, hora, auditor],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      },
    );
  });
}

function listarAprovacoes() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM aprovacoes ORDER BY id DESC`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  inserirUsuario,
  listarUsuarios,
  deletarUsuario,
  criarTabelaRejeicoes,
  inserirRejeicao,
  listarRejeicoes,
  verificarUsuario,
  criarTabelaAprovacoes,
  inserirAprovacao,
  listarAprovacoes,
};
