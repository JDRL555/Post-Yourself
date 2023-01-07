import React from 'react'
import { Header } from '../components/Header'
import { useEffect, useState } from 'react'
import { isAuthorizedRequest } from '../api/home.api'

export const Index = () => {
  let [user, setUser] = useState("")
  const token = localStorage.getItem("session")
  useEffect(()=>{
    async function result(){
      try {
        const {data} = await isAuthorizedRequest(token)
        setUser(data)
        if(user){
          window.location.href = "/posts"
        }
      } catch (err) {
        console.log(err)
      }
    }
    result()
  })
  return(
  <>
    <Header user={user} />
  </>
)}

