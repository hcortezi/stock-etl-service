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
      console.log("Nenhuma order encontrada.");
      return;
    }

    orders.forEach((order: Order) => {
      accountsRepository.getById(order.accountId, (account: Account | undefined) => {
        if (!account) {
          console.error(`Conta com id ${order.accountId} não encontrado para order ${order.id}`);
          return;
        }

        stocksRepository.getById(order.stockId, (stock: Stock | undefined) => {
          if (!stock) {
            console.error(`Stock com id ${order.stockId} não encontrado para order ${order.id}`);
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
              console.log(`Transformed order ${order.id} adicionada com sucesso. ID: ${id}`);
            } else {
              console.error(`Falha ao adicionar order transformada ${order.id}.`);
            }
          });
        });
      });
    });
  });
};

export default etlProcess;
