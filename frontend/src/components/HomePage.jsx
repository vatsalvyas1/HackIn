import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='mx-2 md:mx-16 pt-20 pt-26 md:pt-28 md:pb-24 px-4'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='w-full md:w-1/2 mb-10 md:mb-0'>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-mono leading-tight mb-4">
            <span class="block bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Connect.</span> 
            <span class="block bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">Collaborate.</span> 
            <span class="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Code.</span>
          </h1>
          <p class="text-neutral-300 text-lg md:text-xl mb-8 font-mono">
              The social platform designed exclusively for developers. Find teammates, showcase projects, and compete in global hackathons.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
              <Link class="bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:-translate-y-1 text-center">
                Join the Community
              </Link>
              <Link class="bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:-translate-y-1 border border-purple-500 text-center">
                Explore Hackathons
              </Link>
          </div>
          <div class="mt-8 flex items-center">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs text-white">DB</div>
                <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">JS</div>
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">TM</div>
                <div class="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-xs text-white">RK</div>
                <div class="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs text-white">+</div>
              </div>
              <span class="ml-3 text-neutral-400 text-sm">Join 10,000+ developers worldwide</span>
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <div class="relative">
            <div class="bg-neutral-800 rounded-xl shadow-2xl p-6 border border-neutral-700 transform hover:-translate-y-2 transition-all duration-300">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-lg font-semibold">D</div>
                  <div>
                    <h3 class="text-white font-medium">DevTeam Alpha</h3>
                    <p class="text-neutral-400 text-sm">Global Rank: #42</p>
                  </div>
                </div>
                <div class="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                  1024 🏆 Points
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="bg-neutral-900 rounded-lg p-4 border border-neutral-700">
                  <p class="text-neutral-300 mb-2">Looking for a <span class="text-purple-400">React Developer</span> to join our team for the upcoming NASA Space Apps Challenge!</p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded">React</span>
                    <span class="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded">Node.js</span>
                    <span class="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded">Firebase</span>
                  </div>
                </div>
                
                <div class="flex justify-between items-center">
                  <button class="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 text-sm rounded transition-colors duration-300">Apply Now</button>
                  <div class="text-neutral-400 text-sm">3 days left</div>
                </div>
              </div>
            </div> 
            
            <div class="absolute -top-4 -left-4 h-16 w-16 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
            <div class="absolute -bottom-6 -right-6 h-24 w-24 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
