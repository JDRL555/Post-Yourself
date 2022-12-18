import { Route, Routes }  from 'react-router-dom'
import { Home }           from './pages/Home'
import { Register }       from './pages/Register'
import { Login }          from './pages/Login'
import { NotFound }       from './pages/NotFound'


export const App = ()=> (
  <>
    <Routes>
      <Route path='/'         element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login'    element={<Login />} />
      <Route path='*'         element={<NotFound/>} />
    </Routes>
  </>
)
