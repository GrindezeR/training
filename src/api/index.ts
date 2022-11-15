import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.104:3000/api',
});

export const api = {
  register(name: string, email: string, password: string) {
    return instance.post('/register', { name, email, password });
  },
  updateExerciseCount(id: string, count: number) {
    return instance.put('/exercises', { id, count });
  },
};
