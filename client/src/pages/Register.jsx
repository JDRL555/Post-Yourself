import { useState }  from "react"
import  { Link }                from 'react-router-dom'
import { createUserRequest }    from "../api/profiles.api"
import                               './styles/ProfileForm.css'

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
            result.className = "correct"
            result.innerHTML = response.data
            setTimeout(()=>{
              window.location.href = "/login"
            }, 3000)
          } catch (error) {
            result.innerHTML = error.response.data
          }
        }}
      >
        <h1>Register Here!</h1>
        <p className="result incorrect"></p>
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
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
        />
        <button type="submit">Send</button> <br />
        <Link className="link" to="/login">Have a count? Login here!</Link>
      </form>
    </main>
  )
}
