import client from './client';

export const getTasks = async () => {
  const res = await client.get('/tasks');
  return res.data;
};

export const createTask = async (title: string, description?: string) => {
  const res = await client.post('/tasks', { title, description });
  return res.data;
};

export const updateTask = async (id: string, data: { completed?: boolean; title?: string }) => {
  const res = await client.patch(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await client.delete(`/tasks/${id}`);
  return res.data;
};