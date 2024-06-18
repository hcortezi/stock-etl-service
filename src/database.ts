import sqlite3 from "sqlite3";
const DBSOURCE = "stocks.db";

/***
 * Atenção: não existe tipo boolean no banco SQLite.
 * Apenas devemos representar como inteiro
 * sendo: 0 => false e 1 => true.
 */
const DDL_SCRIPT = `
  CREATE TABLE IF NOT EXISTS stocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT,
    price REAL
  );
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountId INTEGER,
    stockId INTEGER,
    type TEXT,
    quantity INTEGER,
    status TEXT,
    FOREIGN KEY (accountId) REFERENCES accounts(id),
    FOREIGN KEY (stockId) REFERENCES stocks(id)
  );
`;
    const database = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      } else {
        console.log("Database conectado.");
      }
    });
    
    // Cria a tabela apenas depois de estabeler a conexão com o banco
    database.serialize(() => {
      database.run(DDL_SCRIPT, (err) => {
        if (err) {
          console.log("Tabela stocks já existe.");
        } else {
          console.log("Tabela stocks criada.");
        }
      });
    });
    
    export default database;