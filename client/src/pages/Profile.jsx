import React, { useState, useEffect } from 'react'
import { isAuthorizedRequest } from '../api/home.api'

export const Profile = () => {
  const token = localStorage.getItem("session")
  let [user, setUser] = useState("")
  
  useEffect(()=>{
    async function result(){
      try {
        const {data} = await isAuthorizedRequest(token)
        setUser(data)
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: "error",
          "title": "Sorry, you don't have access here!",
          "text": err.response.data
        }).then(() => window.location.href = "/")
      }
    }
    result()
  })
  return (
    <div>Profile</div>
  )
}
