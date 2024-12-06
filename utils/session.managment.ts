const userToken = "userSessionToken";

export const setToken = (token: string) => {
  localStorage.setItem(userToken, token);
};

export const getToken = () => {
  const token = localStorage.getItem(userToken);
  return token;
};

export const removeToken = () => {
  localStorage.removeItem(userToken);
};
