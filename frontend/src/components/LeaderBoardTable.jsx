export default function LeaderBoardTable() {
    return(
        <div className="max-w-5xl mx-auto">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
          {/* Leaderboard Top 3 */}
          <div className="flex flex-col md:flex-row justify-between p-6 bg-neutral-800 border-b border-neutral-700">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 w-full md:w-1/3 px-4 py-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-2">QN</div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <div className="bg-neutral-900 text-neutral-300 rounded-full px-4 py-1 text-sm mb-2 mt-2">#2</div>
              <h3 className="text-white font-medium text-lg mb-1">Quantum Ninjas</h3>
              <p className="text-neutral-400 text-sm">United States</p>
              <div className="mt-3 flex items-center bg-neutral-900 rounded-full px-4 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                <span className="text-yellow-500 font-bold">4,892 🏆</span>
              </div>
            </div>
            
            {/* 1st Place */}
            <div className="order-1 md:order-2 w-full md:w-1/3 px-4 pb-6 flex flex-col items-center">
              <div className="w-8 h-8 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 013.712 8.92l-.345.344a.75.75 0 01-1.07-1.05l.345-.345A3.75 3.75 0 0012 3a3.75 3.75 0 00-3.712 4.354l.345.345a.75.75 0 01-1.05 1.05l-.345-.345A5.25 5.25 0 0112 1.5zM4.5 17.25a.75.75 0 00-.75.75v.992c0 .379.145.742.403 1.013l.154.155a.75.75 0 001.073-1.046l-.154-.155v-.992a.75.75 0 00-.75-.75H4.5zm1.5-1.5a.75.75 0 00-.75.75v.75c0 .69.56 1.25 1.25 1.25h.75a.75.75 0 000-1.5h-.75v-.75a.75.75 0 00-.75-.75zm15.75.75v.75h-.75a.75.75 0 000 1.5h.75c.69 0 1.25-.56 1.25-1.25v-.75a.75.75 0 00-1.5 0zM4.5 13.5a.75.75 0 01.75-.75h.992c.379 0 .742-.145 1.013-.403l.155-.155a.75.75 0 111.046 1.073l-.155.154a1.505 1.505 0 01-1.013.403H5.25a.75.75 0 01-.75-.75zm14.257 1.5a.75.75 0 01-1.046-1.073l.155-.154c.258-.258.403-.621.403-1.013v-.992a.75.75 0 111.5 0v.992c0 .379-.145.742-.403 1.013l-.155.155zM18 16.5a.75.75 0 00-.75-.75h-.992a1.505 1.505 0 00-1.013.403l-.155.155a.75.75 0 11-1.046-1.073l.155-.154c.258-.258.621-.403 1.013-.403h.992a.75.75 0 01.75.75zM9 12a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="relative mt-1">
                <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-2">TC</div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                  </svg>
                </div>
              </div>
              <div className="bg-yellow-500 text-black rounded-full px-4 py-1 text-sm font-bold mb-2 mt-2">#1</div>
              <h3 className="text-white font-semibold text-xl mb-1">TechCrusaders</h3>
              <p className="text-neutral-400 text-sm">Singapore</p>
              <div className="mt-3 flex items-center bg-yellow-500/20 rounded-full px-4 py-1 border border-yellow-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                <span className="text-yellow-500 font-bold">5,748 🏆</span>
              </div>
            </div>
            
            {/* 3rd Place */}
            <div className="order-3 w-full md:w-1/3 px-4 py-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white mb-2">DS</div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
              </div>
              <div className="bg-neutral-900 text-neutral-300 rounded-full px-4 py-1 text-sm mb-2 mt-2">#3</div>
              <h3 className="text-white font-medium text-lg mb-1">DevSavants</h3>
              <p className="text-neutral-400 text-sm">Germany</p>
              <div className="mt-3 flex items-center bg-neutral-900 rounded-full px-4 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                <span className="text-yellow-500 font-bold">4,510 🏆</span>
              </div>
            </div>
          </div>
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-neutral-900 py-3 px-6 border-b border-neutral-700 font-medium text-sm text-neutral-400">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Team</div>
            <div className="col-span-2">Hackathons</div>
            <div className="col-span-2">Wins</div>
            <div className="col-span-3">Trophy Points</div>
          </div>
          
          {/* Table Rows */}
          <div className="divide-y divide-neutral-700">
            <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
              <div className="col-span-1 font-bold text-neutral-400">#4</div>
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-white mr-3">BD</div>
                  <div>
                    <h4 className="text-white font-medium">ByteDancers</h4>
                    <p className="text-neutral-500 text-xs">India</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-neutral-300">18</div>
              <div className="col-span-2 text-neutral-300">6</div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "78%"}}></div>
                  </div>
                  <span className="text-purple-400 font-medium">4,238 🏆</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
              <div className="col-span-1 font-bold text-neutral-400">#5</div>
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white mr-3">CS</div>
                  <div>
                    <h4 className="text-white font-medium">CodeSlingers</h4>
                    <p className="text-neutral-500 text-xs">Canada</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-neutral-300">22</div>
              <div className="col-span-2 text-neutral-300">5</div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "74%"}}></div>
                  </div>
                  <span className="text-purple-400 font-medium">4,072 🏆</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
              <div className="col-span-1 font-bold text-neutral-400">#6</div>
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center font-bold text-white mr-3">NS</div>
                  <div>
                    <h4 className="text-white font-medium">NodeSharks</h4>
                    <p className="text-neutral-500 text-xs">Australia</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-neutral-300">16</div>
              <div className="col-span-2 text-neutral-300">7</div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "71%"}}></div>
                  </div>
                  <span className="text-purple-400 font-medium">3,945 🏆</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
              <div className="col-span-1 font-bold text-neutral-400">#7</div>
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center font-bold text-white mr-3">FC</div>
                  <div>
                    <h4 className="text-white font-medium">FutureCrafters</h4>
                    <p className="text-neutral-500 text-xs">United Kingdom</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-neutral-300">14</div>
              <div className="col-span-2 text-neutral-300">5</div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "66%"}}></div>
                  </div>
                  <span className="text-purple-400 font-medium">3,689 🏆</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
              <div className="col-span-1 font-bold text-neutral-400">#8</div>
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white mr-3">BW</div>
                  <div>
                    <h4 className="text-white font-medium">BrainWaves</h4>
                    <p className="text-neutral-500 text-xs">France</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-neutral-300">12</div>
              <div className="col-span-2 text-neutral-300">4</div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "61%"}}></div>
                  </div>
                  <span className="text-purple-400 font-medium">3,512 🏆</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
              <div className="col-span-1 font-bold text-neutral-400">#9</div>
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white mr-3">CW</div>
                  <div>
                    <h4 className="text-white font-medium">CodeWizards</h4>
                    <p className="text-neutral-500 text-xs">Brazil</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-neutral-300">15</div>
              <div className="col-span-2 text-neutral-300">3</div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "58%"}}></div>
                  </div>
                  <span className="text-purple-400 font-medium">3,284 🏆</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
              <div className="col-span-1 font-bold text-neutral-400">#10</div>
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center font-bold text-white mr-3">DB</div>
                  <div>
                    <h4 className="text-white font-medium">DigitalBrewers</h4>
                    <p className="text-neutral-500 text-xs">Japan</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-neutral-300">11</div>
              <div className="col-span-2 text-neutral-300">4</div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{width: "56%"}}></div>
                  </div>
                  <span className="text-purple-400 font-medium">3,138 🏆</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-neutral-700 flex justify-between items-center">
            <div className="text-neutral-400 text-sm">Showing <span className="text-white">1</span> to <span className="text-white">10</span> of <span className="text-white">5,280</span> teams</div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300">Previous</button>
              <button className="px-3 py-1 rounded bg-purple-700 text-white">1</button>
              <button className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300">2</button>
              <button className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300">3</button>
              <button className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300">...</button>
              <button className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300">528</button>
              <button className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300">Next</button>
            </div>
          </div>
        </div>
      </div>
    )
}