import {Link} from 'react-router-dom'
import './styles/Navbar.css'

export const Navbar = ({username}) => (
  <div className="navbar">
    <ul>
      <li> <h3>Welcome{username ? `, ${username}` : ""}</h3></li>
      <li> <Link to="/">Home</Link></li>
      <li> <Link to="/register">Register</Link></li>
      <li> <Link to="/login">Login</Link></li>
      <li> <Link to='/posts'>Posts</Link></li>
      {
        username 
        ? <li className='profile'> 
            <i>{username}</i>
            <Link to='/profile'>See my posts</Link> 
            <li>Config</li> 
            <li>Log out</li> 
          </li> 
        : ""
      }
    </ul>
  </div>
)