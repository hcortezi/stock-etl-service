import Stock from "../models/Stock";
import database from "../database";

const stocksRepository = {
  addNew: (stock: Stock, callback: (id?: number) => void) => {
    const sql = "INSERT INTO stocks (symbol, price) VALUES (?, ?)";
    const params = [stock.symbol, stock.price];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },

  getAll: (callback: (stocks: Stock[]) => void) => {
    const sql = "SELECT * FROM stocks";
    database.all(sql, [], (_err, rows) => callback(rows as Stock[]));
  },

  getById: (id: number, callback: (stock?: Stock) => void) => {
    const sql = "SELECT * FROM stocks WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Stock));
  },
};

export default stocksRepository;
