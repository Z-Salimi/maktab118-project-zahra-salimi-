import axios from 'axios';
import { urls } from '../urls';
import { getToken } from '@/utils/session.managment';



export const getUsers = async (): Promise<IUser[]> => {
  console.log('Calling getUsers...');
  try {
    const token = getToken();
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


export const getUserInfo = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
    console.log('userrr',response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user info", error);
    throw error;
  }
};
