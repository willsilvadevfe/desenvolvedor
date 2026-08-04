const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'barbershop.db'));

db.pragma('journal_mode = WAL');

// Cria a tabela de agendamentos caso não exista.
// A restrição UNIQUE(date, time) é o que garante, no nível do banco,
// que dois clientes nunca consigam reservar o mesmo horário.
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    service TEXT NOT NULL,
    notes TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(date, time)
  );
`);

module.exports = db;
