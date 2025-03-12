import { ArrowRight } from 'lucide-react';

export default function DashBoardDemo() {
    return(
        <div className="mt-16 pt-16 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-2/5 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                Dev <span className="text-purple-500">Dashboard</span>
              </h2>
              <p className="text-neutral-400 mb-6">
                Track your progress, manage your teams, and showcase your achievements all in one place.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-semibold">Hackathon Participation</h3>
                    <p className="text-neutral-400">Keep track of past and upcoming hackathons you've registered for.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-semibold">Team Management</h3>
                    <p className="text-neutral-400">Manage your teams, view team stats, and coordinate with teammates.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-semibold">Achievement Tracking</h3>
                    <p className="text-neutral-400">Showcase your trophies, points, and badges earned from competitions.</p>
                  </div>
                </li>
              </ul>
              <a href="#" className="mt-8 inline-flex items-center px-6 py-3 bg-purple-700 hover:bg-purple-600 hover:-translate-y-1 text-white font-medium rounded-lg transition-all duration-300">
                Create Your Account
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
  
            <div className="w-full md:w-1/2 hover:-translate-y-2 transition-all duration-300 group">
              <div className="bg-neutral-800 rounded-xl border border-neutral-700 group-hover:border-purple-500 overflow-hidden shadow-2xl transition-all duration-300 group">
                <div className="bg-neutral-900 p-4 border-b border-neutral-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center">
                      <span className="text-white font-bold">PJ</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-white font-medium">Prince Jha</h3>
                      <p className="text-neutral-400 text-sm">Full Stack Developer</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium mr-2">
                      104 🏆
                    </span>
                    <button className="text-neutral-400 hover:text-white">
                        <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
  
                <div className="grid grid-cols-3 divide-x divide-neutral-700 border-b border-neutral-700">
                  <div className="p-4 text-center">
                    <p className="text-3xl font-bold text-purple-500">8</p>
                    <p className="text-neutral-400 text-sm">Hackathons</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-3xl font-bold text-purple-500">3</p>
                    <p className="text-neutral-400 text-sm">Teams</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-3xl font-bold text-purple-500">12</p>
                    <p className="text-neutral-400 text-sm">Projects</p>
                  </div>
                </div>
  
                <div className="p-4">
                  <h4 className="text-white font-medium mb-3">Current Team</h4>
                  <div className="bg-neutral-900 rounded-lg p-4 mb-4 border border-neutral-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="text-white">DareDev</h5>
                        <p className="text-neutral-400 text-sm">Global Rank: #128</p>
                      </div>
                      <div className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                        768 🏆
                      </div>
                    </div>
                    <div className="flex mt-3 space-x-1">
                      <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">VV</div>
                      <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">RM</div>
                      <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-xs text-white">PJ</div>
                      <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-xs text-white">PG</div>
                    </div>
                  </div>
  
                  <h4 className="text-white font-medium mb-3">Upcoming Hackathon</h4>
                  <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="text-white">AceHack 4.0</h5>
                        <p className="text-neutral-400 text-sm">Starts in 3 days</p>
                      </div>
                      <button className="bg-purple-700 hover:bg-purple-600 px-3 py-1 rounded text-xs text-white">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}