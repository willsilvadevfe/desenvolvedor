import Database from "better-sqlite3";

const db = new Database("database/database.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    registro INTEGER NOT NULL UNIQUE,
    senha TEXT NOT NULL,
  )
`);

export default db;
