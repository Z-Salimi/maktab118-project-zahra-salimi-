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
