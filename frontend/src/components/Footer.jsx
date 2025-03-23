import { Link } from "react-router-dom";
import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-neutral-900 pt-16 border-t border-neutral-800"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          <div className="lg:col-span-2">
            <Link
              to={"/"}
              className="text-xl font-bold font-mono text-purple-500 flex items-center"
            >
              <span className="text-2xl">&lt;</span>HackIn
              <span className="text-2xl">/&gt;</span>
            </Link>
            <p className="text-neutral-400 mt-4 mb-6 max-w-md">
              The ultimate platform for developers to connect, collaborate on
              hackathons, and showcase their skills. Build your team, join
              competitions, and climb the global leaderboard.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-purple-900/30 hover:text-purple-400 transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-purple-900/30 hover:text-purple-400 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-purple-900/30 hover:text-purple-400 transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-purple-900/30 hover:text-purple-400 transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/hackmates"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Hackmates
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/hackathons"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Hackathons
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Developer Feed
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-purple-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white text-lg font-medium mb-2">
                Stay Updated
              </h3>
              <p className="text-neutral-400">
                Get the latest hackathon news and developer updates
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-neutral-500"
                />
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-500 text-sm mb-4 md:mb-0">
              © 2025 HackIn. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Code of Conduct
              </a>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"></div>
      </div>
    </footer>
  );
}
