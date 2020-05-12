import API from '@hellosirandy/rest-api-wrapper';

const baseURL = process.env.REACT_APP_ENDPOINT;
const api = new API(baseURL);

export const signInAPI = (username, password) => {
  const options = {
    endpoint: '/login',
    body: {
      username,
      password,
    },
  };
  return api.post(options);
};

export const refreshTokenAPI = (refreshToken) => {
  const options = {
    token: `Bearer ${refreshToken}`,
    endpoint: '/token/refresh',
  };
  return api.post(options);
};
