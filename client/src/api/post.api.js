import axios from 'axios'

export const createPostRequest = async data => await axios.post("http://localhost:4000/new/post", data)