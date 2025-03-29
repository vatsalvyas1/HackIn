import React from 'react'
import { Link } from "react-router-dom"

function DashboardPlaceholder() {
  return (
    <div>
      <section id="dashboard-preview" className="bg-neutral-900 py-20">
    <div className="container mx-auto px-4">
      {/* <!-- Section Header --> */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/30 text-purple-400 border border-purple-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Personal Dashboard
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">Track Your <span className="text-purple-500">Developer Journey</span></h2>
        <p className="text-neutral-400 max-w-3xl mx-auto">Monitor your hackathon participation, team projects, achievements, and growth all in one unified dashboard.</p>
      </div>
      
      {/* <!-- Dashboard Preview --> */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-xl">
          {/* <!-- Dashboard Header --> */}
          <div className="bg-neutral-900 p-6 border-b border-neutral-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-14 w-14 rounded-full bg-purple-700 flex items-center justify-center text-xl font-bold text-white">JS</div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Jane Smith</h3>
                  <p className="text-neutral-400">Full Stack Developer</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="bg-purple-900/30 px-3 py-1.5 rounded-full flex items-center border border-purple-800/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                  <span className="text-purple-400 font-medium">1,248 Points</span>
                </div>
                <div className="bg-neutral-900 px-3 py-1.5 rounded-full flex items-center border border-neutral-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  <span className="text-white font-medium">8 Hackathons</span>
                </div>
                <div className="bg-neutral-900 px-3 py-1.5 rounded-full flex items-center border border-neutral-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span className="text-white font-medium">3 Teams</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* <!-- Dashboard Navigation --> */}
          <div className="bg-neutral-900 px-6 py-3 border-b border-neutral-700 flex overflow-x-auto">
            <button className="px-4 py-2 text-white font-medium border-b-2 border-purple-600 mr-4 whitespace-nowrap">Overview</button>
            <button className="px-4 py-2 text-neutral-400 hover:text-white font-medium border-b-2 border-transparent hover:border-neutral-700 mr-4 transition-colors duration-300 whitespace-nowrap">Teams</button>
            <button className="px-4 py-2 text-neutral-400 hover:text-white font-medium border-b-2 border-transparent hover:border-neutral-700 mr-4 transition-colors duration-300 whitespace-nowrap">Hackathons</button>
            <button className="px-4 py-2 text-neutral-400 hover:text-white font-medium border-b-2 border-transparent hover:border-neutral-700 mr-4 transition-colors duration-300 whitespace-nowrap">Projects</button>
            <button className="px-4 py-2 text-neutral-400 hover:text-white font-medium border-b-2 border-transparent hover:border-neutral-700 mr-4 transition-colors duration-300 whitespace-nowrap">Achievements</button>
          </div>
          
          {/* <!-- Dashboard Content --> */}
          <div className="p-6">
            {/* <!-- Stats Cards --> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Trophy Points</h4>
                  <div className="h-10 w-10 rounded-full bg-yellow-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-white">1,248</p>
                  <div className="flex items-center ml-3 text-green-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    +248
                  </div>
                </div>
                <p className="text-neutral-400 text-sm mt-1">Last 30 days</p>
                <div className="mt-4">
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-neutral-400 text-xs mt-2">Rank: <span className="text-white">#142</span> • <span className="text-yellow-500">Gold League</span></p>
                </div>
              </div>
              
              <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Hackathons</h4>
                  <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-white">8</p>
                  <p className="ml-3 text-neutral-400 text-sm">Participated</p>
                </div>
                <p className="text-neutral-400 text-sm mt-1">2 Upcoming</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">3</span>
                    <span className="text-neutral-400 text-xs">Wins</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">2</span>
                    <span className="text-neutral-400 text-xs">Finalists</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">3</span>
                    <span className="text-neutral-400 text-xs">Completed</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Badges</h4>
                  <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-white">12</p>
                  <div className="flex items-center ml-3 text-green-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    +3
                  </div>
                </div>
                <p className="text-neutral-400 text-sm mt-1">Latest: <span className="text-blue-400">Innovation Master</span></p>
                <div className="mt-4 flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-red-900/60 border-2 border-neutral-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                    </svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-900/60 border-2 border-neutral-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-900/60 border-2 border-neutral-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-900/60 border-2 border-neutral-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-900/60 border-2 border-neutral-900 flex items-center justify-center">
                    <span className="text-purple-400 text-xs font-bold">+8</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <!-- Active Teams --> */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white">Active Teams</h4>
                <a href="#" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300">View All</a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <!-- Team 1 --> */}
                <div className="bg-neutral-900 rounded-xl p-5 border border-neutral-700">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white">TN</div>
                      <div className="ml-3">
                        <h5 className="text-white font-medium">TechNinjas</h5>
                        <p className="text-neutral-400 text-sm">Global Rank: #128</p>
                      </div>
                    </div>
                    <div className="bg-indigo-900/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium">
                      768 🏆
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-neutral-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      AI Global Challenge (Dec 2-3, 2023)
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <p className="text-neutral-400 text-xs mt-1">Project: <span className="text-white">HealthChain AI Platform</span></p>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-neutral-900 flex items-center justify-center text-xs text-white">NS</div>
                      <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-neutral-900 flex items-center justify-center text-xs text-white">AR</div>
                      <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-neutral-900 flex items-center justify-center text-xs text-white">JS</div>
                      <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-neutral-900 flex items-center justify-center text-xs text-white">MK</div>
                    </div>
                    <button className="text-white text-sm bg-indigo-700 hover:bg-indigo-600 rounded-lg px-3 py-1.5 transition-colors duration-300">Team Space</button>
                  </div>
                </div>
                
                {/* <!-- Team 2 --> */}
                <div className="bg-neutral-900 rounded-xl p-5 border border-neutral-700">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold text-white">CB</div>
                      <div className="ml-3">
                        <h5 className="text-white font-medium">CodeBreakers</h5>
                        <p className="text-neutral-400 text-sm">Global Rank: #256</p>
                      </div>
                    </div>
                    <div className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                      542 🏆
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-neutral-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Web Dev Jam (Oct 20-22, 2023)
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <p className="text-neutral-400 text-xs mt-1">Project: <span className="text-white">DevCollab Platform</span></p>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-neutral-900 flex items-center justify-center text-xs text-white">JS</div>
                      <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-neutral-900 flex items-center justify-center text-xs text-white">LT</div>
                      <div className="w-8 h-8 rounded-full bg-yellow-600 border-2 border-neutral-900 flex items-center justify-center text-xs text-white">RP</div>
                    </div>
                    <button className="text-white text-sm bg-purple-700 hover:bg-purple-600 rounded-lg px-3 py-1.5 transition-colors duration-300">Team Space</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <!-- Recent Hackathons --> */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white">Recent Hackathons</h4>
                <a href="#" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300">View All</a>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-neutral-900 rounded-xl border border-neutral-700">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-400 border-b border-neutral-700">Hackathon</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-400 border-b border-neutral-700">Date</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-400 border-b border-neutral-700">Team</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-400 border-b border-neutral-700">Result</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-neutral-400 border-b border-neutral-700">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    <tr className="hover:bg-neutral-800/50 transition-colors duration-200">
                      <td className="py-3 px-4 text-sm text-white">Global Healthcare Hackathon</td>
                      <td className="py-3 px-4 text-sm text-neutral-400">Sep 15-17, 2023</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white mr-2">TN</div>
                          <span className="text-white">TechNinjas</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-green-900/30 text-green-400 px-2 py-0.5 rounded text-xs">1st Place</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-yellow-500 font-medium">+500 🏆</td>
                    </tr>
                    
                    <tr className="hover:bg-neutral-800/50 transition-colors duration-200">
                      <td className="py-3 px-4 text-sm text-white">AI for Climate Change</td>
                      <td className="py-3 px-4 text-sm text-neutral-400">Aug 5-7, 2023</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs text-white mr-2">CB</div>
                          <span className="text-white">CodeBreakers</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">3rd Place</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-yellow-500 font-medium">+200 🏆</td>
                    </tr>
                    
                    <tr className="hover:bg-neutral-800/50 transition-colors duration-200">
                      <td className="py-3 px-4 text-sm text-white">Blockchain Innovation Summit</td>
                      <td className="py-3 px-4 text-sm text-neutral-400">Jul 22-24, 2023</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white mr-2">BN</div>
                          <span className="text-white">BlockNinjas</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-neutral-700 text-neutral-400 px-2 py-0.5 rounded text-xs">Top 10</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-yellow-500 font-medium">+100 🏆</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* <!-- Projects Showcase --> */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white">Projects Showcase</h4>
                <a href="#" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300">Add Project</a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* <!-- Project 1 --> */}
                <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 group hover:border-purple-500 transition-all duration-300">
                  <div className="h-40 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 relative flex items-center justify-center p-4">
                    <div className="absolute inset-0 opacity-80 bg-neutral-900 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      <h5 className="text-white font-medium">HealthChain</h5>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-neutral-400 text-sm mb-3">Blockchain-based healthcare data management platform with AI diagnostics support.</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">React</span>
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">Solidity</span>
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">TensorFlow</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-xs">Global Healthcare Hackathon</span>
                      <a href="#" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300">View</a>
                    </div>
                  </div>
                </div>
                
                {/* <!-- Project 2 --> */}
                <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 group hover:border-purple-500 transition-all duration-300">
                  <div className="h-40 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 relative flex items-center justify-center p-4">
                    <div className="absolute inset-0 opacity-80 bg-neutral-900 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                      </svg>
                      <h5 className="text-white font-medium">ClimateML</h5>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-neutral-400 text-sm mb-3">ML-powered climate change prediction tool using satellite imagery and historical data.</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">Python</span>
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">TensorFlow</span>
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">Flask</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-xs">AI for Climate Change</span>
                      <a href="#" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300">View</a>
                    </div>
                  </div>
                </div>
                
                {/* <!-- Project 3 --> */}
                <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 group hover:border-purple-500 transition-all duration-300">
                  <div className="h-40 bg-gradient-to-r from-amber-900/40 to-orange-900/40 relative flex items-center justify-center p-4">
                    <div className="absolute inset-0 opacity-80 bg-neutral-900 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                      </svg>
                      <h5 className="text-white font-medium">CryptoVault</h5>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-neutral-400 text-sm mb-3">Secure multi-chain crypto wallet with cross-chain swaps and NFT management.</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">Solidity</span>
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">Web3.js</span>
                      <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">React Native</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-xs">Blockchain Innovation Summit</span>
                      <a href="#" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <!-- Create Your Dashboard CTA --> */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-neutral-800">
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-8 border border-purple-800/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Create Your Developer Dashboard</h3>
            <p className="text-neutral-300 max-w-3xl mx-auto mb-8">Track your hackathon journey, showcase your projects, connect with teammates, and climb the global leaderboard.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={"/dashboard"} className="bg-purple-700 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-center">
                Sign Up Now
              </Link>
              <Link to={"/feed"} className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 border border-neutral-700 text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default DashboardPlaceholder
