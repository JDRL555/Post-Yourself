import '../styles/App.css'
import '../styles/index.css'
import '../styles/Home.css'
import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { NewPost } from '../components/NewPost'
import { getPostsRequest } from "../api/post.api.js"

export const Home = ()=>{
  let [data, setData] = useState([])
  
  useEffect(()=>{
    async function posts(){
      const response = await getPostsRequest()
      data = response.data
    }
    posts()
  })

  return (
    <>
      <Navbar />
      <main className="App">
        <NewPost />
        <button onClick={()=>{
          const newPost = document.querySelector(".newPost")
          newPost.style.display = "block"
        }}>
          Post Something!
        </button>
        <h1>{!data.length ? "No post yet!" : ""}</h1>
      </main>
    </>
  )
}
