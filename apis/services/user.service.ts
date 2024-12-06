import axios from 'axios';
import { urls } from '../urls';
import { getToken } from '@/utils/session.managment';



export const getUsers = async (): Promise<IUser[]> => {
  console.log('Calling getUsers...');
  try {
    const token = getToken(); // فرض بر این است که توکن شما در LocalStorage ذخیره شده است
    const response = await axios.get<IResUsers>(urls.users, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response data:', error.response?.data);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to fetch users');
  }
};
