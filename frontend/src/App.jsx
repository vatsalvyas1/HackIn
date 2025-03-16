import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import NavBar from './components/Navbar.jsx'
import HomePage from './components/HomePage.jsx'
import Footer from './components/Footer.jsx'
import DashBoard from './components/DashBoard.jsx'
import EditProfile from './components/EditProfile.jsx'
import HackMates from './components/HackMates.jsx'

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

        <Route path='/hackmates' element={<HackMates />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  )
}

export default App
