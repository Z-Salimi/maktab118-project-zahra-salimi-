
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getToken, setToken } from '@/utils/session.managment';

export const loginRequest = async (username: string, password: string): Promise<string> => {
  try {
    const response:ILogin = await axios.post('http://localhost:8000/api/auth/login', {
     username,
      password
    });
    const  token  = response.data.token.accessToken;
    setToken(token);
    return token;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};



