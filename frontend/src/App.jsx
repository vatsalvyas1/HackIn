import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavBar from './components/Navbar.jsx'
import HomePage from './components/HomePage.jsx'
import Footer from './components/Footer.jsx'
import DashBoard from './components/DashBoard.jsx'
import EditProfile from './components/EditProfile.jsx'
import HackMates from './components/HackMates.jsx'
import AddProject from './components/AddProject.jsx'
import ProjectDetails from './components/ProjectDetails.jsx'
import TeamDetails from './components/TeamDetails.jsx'
import LeaderBoard from './components/LeaderBoard.jsx'
import DevFeed from './components/DevFeed.jsx'
import Hackathon from './components/Hackathon.jsx'
import HackathonForm from './components/HackathonForm.jsx'
import HackathonDetails from './components/HackathonDetails.jsx'
import JoinHackathon from './components/JoinHackathon.jsx'
import AddSponsor from './components/AddSponsor.jsx'
import Sponsors from './components/Sponsors.jsx'
import SponsorDetails from './components/SponsorDetails.jsx'

function App() {
  return (
    <div className='flex flex-col'>
      <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/" element={<Link to={"/login"}>Login</Link>} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/add-project' element={<AddProject />} />
        <Route path='/hackmates' element={<HackMates />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/team/:teamId" element={<TeamDetails />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/hackathons" element={<Hackathon />} />
        <Route path="/organise" element={<HackathonForm />} />
        <Route path='/feed' element={<DevFeed />} />
        <Route path='/hackathon/:id' element={<HackathonDetails />} />
        <Route path='/hackathon/:id/apply' element={<JoinHackathon />} />
        <Route path='/sponsor' element={<Sponsors />} />
        <Route path='/add-sponsor' element={<AddSponsor />} />
        <Route path='/sponsor/:id' element={<SponsorDetails />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  )
}

export default App
