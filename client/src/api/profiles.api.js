import axios from 'axios'

export const createUserRequest = async data => await axios.post('http://localhost:4000/profile/register', data)
export const loginUserRequest = async data  => await axios.post('http://localhost:4000/profile/login', data)
export const getUserRequest = async userId => await axios.get('http://localhost:4000/profile/:id', {
  headers: {
    userId
  }
})