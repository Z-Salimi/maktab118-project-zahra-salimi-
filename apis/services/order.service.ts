import axios from 'axios';
import { urls } from '../urls';



export const getOrders = async (page = 1, limit = 10): Promise<IResOrders> => {
  try {
    const response = await axios.get<IResOrders>(urls.orders, {
      params: { page, limit },
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching orders:', error.response?.data);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to fetch orders');
  }
};



// Create a new order
export const createOrder = async (orderData: IOrderCreate) => {
  try {
    const response = await axios.post(urls.orders, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order', error);
    throw error;
  }
};

// Update an existing order
export const updateOrder = async (orderId: string, updatedData: Partial<IOrder>) => {
  try {
    const response = await axios.patch(`${urls.orders}/${orderId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating order', error);
    throw error;
  }
};

// Delete an order by ID
export const deleteOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order', error);
    throw error;
  }
};


// Get order by ID
export const getOrderById = async (orderId: string) => {
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order', error);
    throw error;
  }
};


export const updateDeliveryStatus = async (orderId: string, deliveryStatus: boolean) => {
  try {
    const response = await axios.patch(`${urls.orders}/${orderId}`, { deliveryStatus });
    return response.data;
  } catch (error) {
    console.error('Error updating delivery status', error);
    throw error;
  }
};


