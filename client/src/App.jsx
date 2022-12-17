import { Route, Routes } from 'react-router-dom'
import { Home }     from './pages/Home'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'
import { Navbar } from './components/Navbar'


export const App = ()=> (
  <>
    <Navbar />
    <Routes>
      <Route path='/'         element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='*'         element={<NotFound/>} />
    </Routes>
  </>
)
