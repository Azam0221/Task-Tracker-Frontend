import client from './client';

export const signupApi = async (name: string, email: string, password: string) => {
  const res = await client.post('/auth/signup', { name, email, password });
  return res.data;
};

export const loginApi = async (email: string, password: string) => {
  const res = await client.post('/auth/login', { email, password });
  return res.data;
};