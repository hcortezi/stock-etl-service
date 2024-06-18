type TransformedOrder = {
  id?: number;
  orderId: number;
  accountName: string;
  stockSymbol: string;
  orderType: 'buy' | 'sell'; 
  quantity: number;
  status: 'open' | 'cancelled' | 'executed'; 
};

export default TransformedOrder;
