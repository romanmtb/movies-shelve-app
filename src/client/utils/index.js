import axios from 'axios'


export const getAllRequest = () => axios.get(`/api/movies/`)

export const getByIdRequest = id => axios.get(`/api/movies/${id}`)

export const addNewRequest = body => axios.post('/api/movies', body = { movie:{foo:'bar'} })

export const movieDeleteRequest = id => axios.delete(`/api/movies/${id}`)

export const updateExistingRequest = (id, body) => axios.put(`/api/movies/${id}`, body = {movie: {hello: 'world'}})