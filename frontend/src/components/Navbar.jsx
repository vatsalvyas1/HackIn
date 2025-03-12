import { useEffect, useState } from "react";
import { signInWithGithub, logout } from "../firebase";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = async () => {
    const loggedInUser = await signInWithGithub();
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav className="px-4 mx-2 md:mx-16">
      <div className="flex justify-between items-center py-4">
        <Link to="/" className="text-xl font-bold font-mono text-purple-500">{"<HackIn/>"}</Link>
        <div className="hidden md:flex space-x-6 text-white font-mono">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <Link to="/find-teammates" className="hover:text-purple-400">Hackmates</Link>
          <Link to="/leaderboard" className="hover:text-purple-400">Leaderboard</Link>
          <Link to="/hackathons" className="hover:text-purple-400">Hackathons</Link>
          {user ? (
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500">
              Logout
            </button>
          ) : (
            <button onClick={handleLogin} className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600">
              Login with GitHub
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
