import axios from 'axios'

export const getPostsRequest = async ()     => await axios.get("http://localhost:4000")
export const isAuthorizedRequest = async token => await axios.get("http://localhost:4000", {
  headers: {
    token
  }
}) 