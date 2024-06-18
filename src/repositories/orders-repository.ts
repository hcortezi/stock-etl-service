import Order from "../models/Order";
import database from "../database";

const ordersRepository = {
  addNew: (order: Order, callback: (id?: number) => void) => {
    const sql = "INSERT INTO orders (accountId, stockId, type, quantity, status) VALUES (?, ?, ?, ?, ?)";
    const params = [order.accountId, order.stockId, order.type, order.quantity, order.status];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  updateStatus: (id: number, status: 'cancelled' | 'executed', callback: (notFound: boolean) => void) => {
    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    const params = [status, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },

  getAll: (callback: (orders: Order[]) => void) => {
    const sql = "SELECT * FROM orders";
    database.all(sql, [], (_err, rows) => callback(rows as Order[]));
  },

  getById: (id: number, callback: (order?: Order) => void) => {
    const sql = "SELECT * FROM orders WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Order));
  },
};

export default ordersRepository;
