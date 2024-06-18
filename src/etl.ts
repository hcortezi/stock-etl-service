import ordersRepository from "./repositories/orders-repository";
import accountsRepository from "./repositories/accounts-repository";
import stocksRepository from "./repositories/stocks-repository";
import transformedOrdersRepository from "./repositories/transformed-orders-repository";
import Order from "./models/Order";
import Account from "./models/Account";
import Stock from "./models/Stock";
import TransformedOrder from "./models/TransformedOrder";

const etlProcess = () => {
  ordersRepository.getAll((orders: Order[]) => {
    if (!orders || orders.length === 0) {
      console.log("No orders found.");
      return;
    }

    orders.forEach((order: Order) => {
      accountsRepository.getById(order.accountId, (account: Account | undefined) => {
        if (!account) {
          console.error(`Account with id ${order.accountId} not found for order ${order.id}`);
          return;
        }

        stocksRepository.getById(order.stockId, (stock: Stock | undefined) => {
          if (!stock) {
            console.error(`Stock with id ${order.stockId} not found for order ${order.id}`);
            return;
          }

          const transformedOrder: TransformedOrder = {
            orderId: order.id ?? -1, 
            accountName: account.name, 
            stockSymbol: stock.symbol, 
            orderType: order.type,
            quantity: order.quantity,
            status: order.status
          };

          transformedOrdersRepository.addNew(transformedOrder, (id?: number) => {
            if (id) {
              console.log(`Transformed order ${order.id} added successfully. ID: ${id}`);
            } else {
              console.error(`Failed to add transformed order ${order.id}.`);
            }
          });
        });
      });
    });
  });
};

export default etlProcess;
