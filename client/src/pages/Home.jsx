import './styles/App.css'
import './styles/index.css'
import './styles/Home.css'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Navbar } from '../components/Navbar'
import { NewPost } from '../components/NewPost'
import { getPostsRequest, isAuthorizedRequest } from "../api/home.api.js"

export const Home = ()=>{
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
        }).then(() => window.location.href = "/login")
      }
    }
    result()
    // async function posts(){
    //   const {data} = await getPostsRequest()
    //   setData(data)
    //   console.log(data)
    // }
    // posts()
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
