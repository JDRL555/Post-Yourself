import { Link } from 'react-router-dom'
import { useState } from 'react'
import { loginUserRequest } from '../api/profiles.api'

export const Login = ()=>{

  const [ data, setData ] = useState({
    nickName: "",
    password: ""
  })

  return(
    <main>
      <h1>Login here!</h1>
      <form
        onSubmit={async e=>{
          e.preventDefault()
          const result = document.querySelector(".result")
          try {
            const response = await loginUserRequest(data)
            result.innerHTML = response.data
            setTimeout(()=>{
              window.location.href = "/"
            }, 3000)
          } catch (error) {
            result.innerHTML = error.response.data
          }
        }}
      >
    
        <input
        onChange={e=> setData({...data, nickName: e.target.value})} 
        type="text" 
        name="nickName" 
        placeholder="write your nickname" 
        /> 

        <input 
        onChange={e=> setData({...data, password: e.target.value})} 
        type="password" name="password" 
        placeholder="write your password" />

        <button type='submit'>Login</button>
        <Link to='/register'>Don't have a count? Register here!</Link>
        <p className='result'></p>
      </form>
    </main>
  )
}