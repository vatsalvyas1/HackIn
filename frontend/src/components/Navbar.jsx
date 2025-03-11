import { useState } from "react";
import { Menu, X, Code } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="backdrop-blur-sm bg-white/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Code className="h-6 w-6 text-indigo-500" />
            </Link>
            <Link to="/">
              <span className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                HackIn
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to="/find-teammates"
                className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
              >
                Find Teammates
              </Link>
              <Link
                to="/hackathons"
                className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
              >
                Hackathons
              </Link>
              <Link
                to="/leaderboard"
                className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
              >
                Leaderboard
              </Link>
            </div>

            <div className="flex items-center ml-8 space-x-3">
              {/* Login Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Login
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                      Login with Email
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                      Login with LinkedIn
                    </button>
                  </div>
                )}
              </div>

              <Link to="/signup">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-sm hover:shadow">
                  Sign up
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/find-teammates"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Find Teammates
              </Link>
              <Link
                to="/hackathons"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Hackathons
              </Link>
              <Link
                to="/leaderboard"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Leaderboard
              </Link>
            </div>

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 space-x-3">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Login
                </button>
                <Link to="/signup" className="flex-1">
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
