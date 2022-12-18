import '../styles/App.css'
import '../styles/index.css'
import { Navbar } from '../components/Navbar'

export const Home = ()=>(
  <>
    <Navbar />
    <main className="App">
      <h1>Post Yourself</h1>
    </main>
  </>
)