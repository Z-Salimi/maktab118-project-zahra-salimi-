import axios from 'axios';
import { setToken } from '@/utils/session.managment';
import { date } from 'zod';

export const loginRequest = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', {
      username,
      password
    });
    const token = response.data.token.accessToken;
    
    const tokenExpiration = response.data.token.expiresIn * 1000;
    console.log(response.data.user);
    
    setToken(token, tokenExpiration);
    return token;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};
