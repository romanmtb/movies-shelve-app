import axios from 'axios';
import PATH from '../constants/path';

export const getAllRequest = () => axios.get(PATH);
export const getByIdRequest = id => axios.get(`${PATH}${id}`);
export const addNewRequest = (body = { movie: {} }) =>
  axios.post('/api/movies', { movie: body });
export const movieDeleteRequest = id => axios.delete(`${PATH}${id}`);
export const updateExistingRequest = (id, body) =>
  axios.put(`${PATH}${id}`, { movie: body });
