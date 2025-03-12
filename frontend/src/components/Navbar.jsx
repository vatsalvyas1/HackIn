import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="px-4 mx-2 md:mx-16">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold font-mono text-purple-500">{"<HackIn/>"}</Link>
        </div>

        <div className="hidden md:flex space-x-6 text-white font-mono">
          <Link to="/" className="hover:text-purple-400 transition-color duration-300">Home</Link>
          <Link to="/find-teammates" className="hover:text-purple-400 transition-color duration-300">Hackmates</Link>
          <Link to="/leaderboard" className="hover:text-purple-400 transition-color duration-300">Leaderboard</Link>
          <Link to="/hackathons" className="hover:text-purple-400 transition-color duration-300">Hackathons</Link>
          <a 
            href="http://localhost:3000/api/v1/auth/github"
            className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600 transition-color duration-300"
          >
            Login/Signup
          </a>
        </div>

        <div className="md:hidden flex items-center text-white">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden font-mono text-white">
          <div className="flex flex-col space-y-3 py-4 border-t border-b border-neutral-800">
            <Link to="/" className="hover:text-purple-400 transition-color duration-300">Home</Link>
            <Link to="/find-teammates" className="hover:text-purple-400 transition-color duration-300">Hackmates</Link>
            <Link to="/leaderboard" className="hover:text-purple-400 transition-color duration-300">Leaderboard</Link>
            <Link to="/hackathons" className="hover:text-purple-400 transition-color duration-300">Hackathons</Link>
            <a 
              href="http://localhost:3000/api/v1/auth/github"
              className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600 transition-color duration-300"
            >
              Login/Signup
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
