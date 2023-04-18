import axios from 'axios';

const URL = 'http://localhost:5000/user'

export const fetchUsers = () => axios.get(`${URL}/getUsers`)