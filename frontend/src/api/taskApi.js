import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const fetchTasks = (params) => API.get('/tasks', { params }).then(res => res.data);
export const createTask = (data) => API.post('/tasks', data).then(res => res.data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data).then(res => res.data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`).then(res => res.data);
