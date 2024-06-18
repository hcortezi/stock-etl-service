type Order = {
    id?: number;
    accountId: number;
    stockId: number;
    type: 'buy' | 'sell';
    quantity: number;
    status: 'open' | 'cancelled' | 'executed';
  };
  
  export default Order;
  