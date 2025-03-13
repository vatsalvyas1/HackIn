import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import NavBar from './components/Navbar.jsx'
import HomePage from './components/HomePage.jsx'
import Fotter from './components/Fotter.jsx'
import DashBoard from './components/DashBoard.jsx'
import EditProfile from './components/EditProfile.jsx'

function App() {
  return (
    <div className='flex flex-col'>
      <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/" element={<Link to={"/login"}>Login</Link>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
      <Fotter />
    </Router>
    </div>
  )
}

export default App
