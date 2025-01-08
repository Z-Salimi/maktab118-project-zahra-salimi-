import axios from 'axios';
import { clearToken, setToken } from '@/utils/session.managment';


export const loginRequest = async (username: string, password: string): Promise<{ token: string, role: string, username: string }> => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', {
      username,
      password
    });
    const token = response.data.token.accessToken;
    const role = response.data.data.user.role;
    const tokenExpiration = response.data.token.expiresIn * 1000;
    
    setToken(token, tokenExpiration);
    localStorage.setItem('username', response.data.data.user.username);
    localStorage.setItem('userId', response.data.data.user._id);
    localStorage.setItem('role', response.data.data.user.role);
    return { token, role, username: response.data.data.user.username };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

interface ISignup{
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export const signupRequest = async (data: {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
}) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/signup', data);
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

export const logoutRequest = () => {
  clearToken();
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('products');
};
