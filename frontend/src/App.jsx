import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LogIn from './components/LogIn.jsx'

function App() {
  return (
    <Router>
      <h1 className='text-6xl font-bold'>HackIn</h1>
      <Routes>
        <Route path="/" element={<Link to={"/login"}>Login</Link>} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  )
}

export default App
