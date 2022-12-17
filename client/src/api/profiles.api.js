import axios from 'axios'

export const createUserRequest = async data => await axios.post('http://localhost:4000/profile', data)