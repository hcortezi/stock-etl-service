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
    orders.forEach((order: Order) => {
      accountsRepository.getById(order.accountId, (account: Account | undefined) => {
        if (!account) {
          console.error(`Conta com id ${order.accountId} não encontrada em order ${order.id}`);
          return;
        }

        stocksRepository.getById(order.stockId, (stock: Stock | undefined) => {
          if (!stock) {
            console.error(`Stock com id ${order.stockId} não encontrada em order ${order.id}`);
            return;
          }

          const transformedOrder: TransformedOrder = {
            orderId: order.id ?? -1, 
            accountName: account ? account.name : 'Unknown', 
            stockSymbol: stock ? stock.symbol : 'Unknown', 
            orderType: order.type,
            quantity: order.quantity,
            status: order.status
          };

          transformedOrdersRepository.addNew(transformedOrder, (id?: number) => {
            if (id) {
              console.log(`Ordem transformada ${order.id} adicionada com sucesso. ID: ${id}`);
            } else {
              console.error(`Falha ao adicionar ordem transformada ${order.id}.`);
            }
          });
        });
      });
    });
  });
};

export default etlProcess;
