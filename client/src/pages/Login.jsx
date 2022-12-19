import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loginUserRequest } from '../api/profiles.api'

export const Login = ()=>{

  const [ data, setData ] = useState({
    nickName: "",
    password: ""
  })
  const [address, setAdress]    = useState("../../public/ver.png")
  const [passType, setPassType] = useState("password")

  useEffect(()=>{
    const img = document.querySelector(".see")
    img.src = address
  })

  return(
    <main>
      <form
        onSubmit={async e=>{
          e.preventDefault()
          const result = document.querySelector(".result")
          try {
            const response = await loginUserRequest(data)
            result.className = "correct"
            result.innerHTML = response.data
            setTimeout(()=>{
              window.location.href = "/"
            }, 3000)
          } catch (error) {
            result.innerHTML = error.response.data
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
        type={passType} 
        name="password" 
        placeholder="Password" />

        <img className="see" src={address} onClick={() =>{
          address == '../../public/ver.png' 
            ? setAdress("../../public/ojo.png") 
            : setAdress('../../public/ver.png')
          
          passType == "password" 
          ? setPassType("text")
          : setPassType("password")

        }}/>

        <button type='submit'>Login</button> <br />
        <Link className='link' to='/register'>Don't have a count? Register here!</Link>
      </form>
    </main>
  )
}