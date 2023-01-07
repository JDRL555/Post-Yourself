import React, { useState, useEffect } from 'react'
import { isAuthorizedRequest } from '../api/home.api'
import Swal from 'sweetalert2'
import { getUserRequest } from '../api/profiles.api'
import { ProfileHeader } from '../components/ProfileHeader'

export const Profile = () => {
  const token = localStorage.getItem("session")
  let [user, setUser] = useState({})
  
  useEffect(()=>{
    async function result(){
      try {
        const {data} = await isAuthorizedRequest(token)
        const { userId } = data
        const userRequest = await getUserRequest(userId)
        setUser(userRequest.data)
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
    <ProfileHeader username={user} />
  )
}
