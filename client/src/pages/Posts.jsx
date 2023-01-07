import './styles/App.css'
import './styles/index.css'
import './styles/Home.css'
import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { NewPost } from '../components/NewPost'
import { getPostsRequest, isAuthorizedRequest } from "../api/home.api.js"

export const Posts = ()=>{
  const token = localStorage.getItem("session")
  let [user, setUser] = useState({})
  
  useEffect(()=>{
    async function result(){
      try {
        const {data} = await isAuthorizedRequest(token)
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    result()
  })

  return (
    <>
      <Navbar username={user} />
      <main className="App">
        <NewPost />
        <button onClick={()=>{
          const newPost = document.querySelector(".newPost")
          newPost.style.display = "block"
        }}>
          Post Something!
        </button>
        {/* <h1>{!data.length ? "No post yet!" : ""}</h1> */}
      </main>
    </>
  )
}
