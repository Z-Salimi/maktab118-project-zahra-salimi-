export const setToken = (token: string, expirationTime: number) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('tokenExpiration', (Date.now() + expirationTime).toString());
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const clearToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiration');
};
