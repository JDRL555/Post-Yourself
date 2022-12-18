import { useState }           from "react"
import  { Link }              from 'react-router-dom'
import { createUserRequest }  from "../api/profiles.api"
import                             '../styles/ProfileForm.css'

async function response() {
  try {
    const response = await createUserRequest()
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  
  return (
    <main>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const result = document.querySelector(".result")
          try {
            const response = await createUserRequest(data)
            result.setAttribute("class", "correct")
            if (result.className == "incorrect") result.className = "correct"
            result.innerHTML = response.data
            setTimeout(()=>{
              window.location.href = "/login"
            }, 3000)
          } catch (error) {
            if (result.className == "correct") result.className = "incorrect" 
            result.innerHTML = error.response.data
          }
        }}
      >
        <h1>Register Here!</h1>
        <input
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <input
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
        <input
          onChange={(e) => setData({ ...data, nickName: e.target.value })}
          type="text"
          name="nickName"
          placeholder="Nick name"
        />
        <input
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="text"
          name="password"
          placeholder="Password"
        />
        <input
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          type="text"
          name="confirmPassword"
          placeholder="Confirm your password"
        />
        <button type="submit">Send</button> <br />
        <Link className="login" to="/login">Have a count? Login here!</Link>
        <p className="result incorrect"></p>
      </form>
    </main>
  )
}
