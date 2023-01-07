import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loginUserRequest } from '../api/profiles.api'

export const Login = ()=>{

  const [ data, setData ] = useState({
    nickName: "",
    password: ""
  })

  return(
    <main>
      <form
        onSubmit={async e=>{
          e.preventDefault()
          const result = document.querySelector(".result")
          try {
            const {data: {message, token}} = await loginUserRequest(data)
            localStorage.setItem("session", token)
            result.className = "correct"
            result.innerHTML = message
            setTimeout(()=>{
              window.location.href = "/posts"
            }, 3000)
          } catch (error) {
            console.log(error)
            result.innerHTML = error.response.data.message
          }
        }}
      >
        <h1>Login here!</h1>
        <p className="result incorrect"></p>
        <input
        onChange={e=> setData({...data, nickName: e.target.value})} 
        type="text" 
        name="nickName" 
        placeholder="Nick name" 
        /> 

        <input 
        onChange={e=> setData({...data, password: e.target.value})} 
        type="password" 
        name="password" 
        placeholder="Password" />

        <button type='submit'>Login</button> <br />
        <Link className='link' to='/register'>Don't have a count? Register here!</Link>
      </form>
    </main>
  )
}