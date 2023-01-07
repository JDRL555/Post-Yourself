import {Link} from 'react-router-dom'
import './styles/Navbar.css'

export const Navbar = ({username}) => {
  const {nickName, userId} = username
  return (
  <div className="navbar">
    <ul>
      <li> <h3>Welcome{nickName ? `, ${nickName}` : ""}</h3></li>
      {
        !nickName ?
        <>
          <li> <Link to="/">Home</Link></li>
          <li> <Link to="/register">Register</Link></li>
          <li> <Link to="/login">Login</Link></li>
        </>
        : ""  
      }
      <li> <Link to='/posts'>Posts</Link></li>
      { nickName ? <li> <Link to='/profile'>{nickName}</Link> </li>: "" }
    </ul>
  </div>
)}