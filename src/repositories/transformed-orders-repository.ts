import TransformedOrder from "../models/TransformedOrder";
import analyticalDB from "../database-analytical";

const transformedOrdersRepository = {
  addNew: (order: TransformedOrder, callback: (id?: number) => void) => {
    const sql = "INSERT INTO transformed_orders (orderId, accountName, stockSymbol, orderType, quantity, status) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [order.orderId, order.accountName, order.stockSymbol, order.orderType, order.quantity, order.status];
    analyticalDB.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getAll: (callback: (orders: TransformedOrder[]) => void) => {
    const sql = "SELECT * FROM transformed_orders";
    analyticalDB.all(sql, [], (_err, rows) => callback(rows as TransformedOrder[]));
  },
};

export default transformedOrdersRepository;
