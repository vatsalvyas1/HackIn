import { useEffect, useState } from "react";
import { signInWithGithub } from "../firebase";
import { Link } from "react-router-dom";
import { Menu, X, Github } from "lucide-react";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = async () => {
    const loggedInUser = await signInWithGithub();
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      if (loggedInUser.firstLogin) {
        window.location.href = "/edit-profile";
      }
    }
  };

  return (
    <nav className="px-4 mx-2 md:mx-16">
      <div className="flex justify-between items-center py-4 border-b border-neutral-800">
        <Link to="/" className="text-xl font-bold font-mono text-purple-500">{"<HackIn/>"}</Link>
        <div className="hidden md:flex items-center space-x-6 text-white font-mono">
          <Link to="/" className="hover:text-purple-400 transition-color duration-300">Home</Link>
          <Link to="/hackmates" className="hover:text-purple-400 transition-color duration-300">Hackmates</Link>
          <Link to="/leaderboard" className="hover:text-purple-400 transition-color duration-300">Leaderboard</Link>
          <Link to="/hackathons" className="hover:text-purple-400 transition-color duration-300">Hackathons</Link>
          {user ? (
            <Link to={'/dashboard'} className="px-4 py-2 flex items-center gap-4 bg-purple-700 rounded-md hover:bg-purple-600 transition-color duration-300">
              <img src={user.profileImage} alt="" className="h-8 w-8 rounded-full"/>
              <div>
                <p className="text-sm">Hello!</p>
                <p className="text-sm">{user.name}</p>
              </div>
            </Link>
          ) : (
            <button onClick={handleLogin} className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600 flex items-center gap-2">
              Login with <Github size={24}/>
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden flex flex-col space-y-4 text-white font-mono">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <Link to="/find-teammates" className="hover:text-purple-400">Hackmates</Link>
          <Link to="/leaderboard" className="hover:text-purple-400">Leaderboard</Link>
          <Link to="/hackathons" className="hover:text-purple-400">Hackathons</Link>
          {user ? (
            <Link to={'/dashboard'} className="px-4 py-2 flex items-center gap-4 bg-purple-700 rounded-md hover:bg-purple-600 transition-color duration-300">
              <img src={user.profileImage} alt="" className="h-8 w-8 rounded-full"/>
              <div>
                <p>Hello!</p>
                <p>{user.name}</p>
              </div>
            </Link>
          ) : (
            <button onClick={handleLogin} className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600 flex items-center gap-2">
              Login with <Github size={24}/>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
