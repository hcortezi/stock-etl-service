import sqlite3 from 'sqlite3';

const DBSOURCE = 'analytics.db';

const analyticalDB = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log(`Database analítico conectado: ${DBSOURCE}`);
  }
});

const DDL_SCRIPT = `
  CREATE TABLE IF NOT EXISTS transformed_orders (
    orderId INTEGER PRIMARY KEY,
    accountName TEXT,
    stockSymbol TEXT,
    orderType TEXT,
    quantity INTEGER,
    status TEXT
  );
`;

analyticalDB.serialize(() => {
  analyticalDB.exec(DDL_SCRIPT, (err) => {
    if (err) {
      console.error("Falha ao iniciar database analítico:", err);
    } else {
      console.log("Database analítico iniciado.");
    }
  });
});

export default analyticalDB;
