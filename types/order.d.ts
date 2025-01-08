interface IOrder {
    _id: string;
    user: string;
    products: Array<{ product: string; count: number }>;
    totalPrice: number;
    deliveryDate: string | null;
    deliveryStatus: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  interface IResOrders {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      orders: IOrder[];
    };
  }
  interface IOrderCreate {
    user: string;
    products: Array<{ product: string; count: number }>;
    deliveryStatus: boolean;
  }
  