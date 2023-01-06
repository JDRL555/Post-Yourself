import { Route, Routes }  from 'react-router-dom'
import { Index }          from './pages/Index'
import { Posts }           from './pages/Posts'
import { Register }       from './pages/Register'
import { Login }          from './pages/Login'
import { NotFound }       from './pages/NotFound'
import { Profile }        from './pages/Profile'


export const App = ()=> (
  <>
    <Routes>
      <Route path='/'               element={<Index />} />
      <Route path='/posts'          element={<Posts/>} />
      <Route path='/register'       element={<Register/>} />
      <Route path='/login'          element={<Login />} />
      <Route path='/profile'        element={<Profile />} />
      <Route path='*'               element={<NotFound/>} />
    </Routes>
  </>
)
