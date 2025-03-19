import React from 'react';

const DevFeed = () => {
  return (
    <>
      <div className="text-center mb-16 pt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
          Developer <span className="text-purple-500">Social Feed</span>
        </h2>
        <p className="text-neutral-400 max-w-3xl mx-auto">
          Connect with like-minded developers, share your projects, participate in technical discussions, and stay updated with the latest in tech.
        </p>
      </div>

      <div className="max-w-4xl mx-auto pb-8">
        {/* Feed Controls */}
        <div className="bg-neutral-800 rounded-t-xl p-4 border border-neutral-700 flex flex-wrap items-center justify-between gap-4 ">
          <div className="flex space-x-1">
            <button className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">All Posts</button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">Projects</button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">Teams</button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">Discussions</button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="bg-neutral-900 text-white pl-10 pr-4 py-2 rounded-lg border border-neutral-700 focus:border-purple-500 focus:outline-none w-full md:w-auto" 
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-neutral-400 absolute left-3 top-2.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {/* Post Creation */}
        <div className="bg-neutral-800 p-4 border-x border-b border-neutral-700">
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center">
              <span className="text-white font-bold">JS</span>
            </div>
            <div className="flex-1">
              <div className="bg-neutral-900 rounded-lg p-3 border border-neutral-700">
                <input 
                  type="text" 
                  placeholder="Share your thoughts, code, or project..." 
                  className="bg-transparent text-white w-full focus:outline-none" 
                />
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex space-x-2">
                  <button className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Image
                  </button>
                  <button className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Video
                  </button>
                  <button className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Code
                  </button>
                </div>
                <button className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feed Posts */}
        {/* Post 1: Project Showcase */}
        <div className="bg-neutral-800 p-6 border-x border-b border-neutral-700 hover:bg-neutral-800/80 transition-colors duration-300">
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">AR</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">Alex Rodriguez</h3>
                  <p className="text-neutral-400 text-sm">Frontend Developer • 3 hours ago</p>
                </div>
                <div className="bg-neutral-700 px-2 py-1 rounded text-xs text-white">Project</div>
              </div>
              
              <div className="mt-3">
                <p className="text-neutral-300 mb-4">
                  Just launched my new open-source project - a React component library with built-in dark mode support using Tailwind CSS! Check it out and let me know what you think. PRs welcome! 🚀
                </p>
                
                <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700 font-mono text-sm overflow-auto">
                  <pre className="text-green-400">npm install @alexr/react-dark-ui</pre>
                  <div className="mt-2 text-purple-400">
                    import {'{ Button, Card }'} from '@alexr/react-dark-ui';<br /><br />
                    function App() {'{'}<br />
                    &nbsp;&nbsp;return (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h2&gt;Hello World&lt;/h2&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Button variant="primary"&gt;Click Me&lt;/Button&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Card&gt;<br />
                    &nbsp;&nbsp;);<br />
                    {'}'}
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">React</span>
                  <span className="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">Tailwind</span>
                  <span className="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">Open Source</span>
                  <span className="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">UI Components</span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-6">
                    <button className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      128
                    </button>
                    <button className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      42
                    </button>
                    <button className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      Share
                    </button>
                  </div>
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-sm">View on GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Post 2: Team Post */}
        <div className="bg-neutral-800 p-6 border-x border-b border-neutral-700 hover:bg-neutral-800/80 transition-colors duration-300">
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">TN</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">Team Nexus</h3>
                  <p className="text-neutral-400 text-sm">Hackathon Team • 5 hours ago</p>
                </div>
                <div className="bg-indigo-700 px-2 py-1 rounded text-xs text-white">Team</div>
              </div>
              
              <div className="mt-3">
                <p className="text-neutral-300 mb-4">
                  We're thrilled to announce that our project "HealthChain" won first place at the Global Healthcare Hackathon! Thanks to everyone who supported us. Here's a quick demo of what we built:
                </p>
                
                <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-700 mb-4">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 text-neutral-700 mx-auto mb-3" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                        />
                      </svg>
                      <p className="text-neutral-400">Video Demo Placeholder</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800/30 mb-4 ">
                  <div className="flex items-center space-x-2 text-purple-400 mb-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Achievement Unlocked: First Place Trophy</span>
                  </div>
                  <p className="text-neutral-300">+500 points added to Team Nexus' ranking</p>
                </div>
                
                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">Blockchain</span>
                  <span class="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">Healthcare</span>
                  <span class="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">React</span>
                  <span class="bg-neutral-700 text-neutral-300 text-xs px-3 py-1 rounded-full">Solidity</span>
                </div>

                  <div class="mt-4 flex items-center justify-between">
                  <div class="flex space-x-6">
                    <button class="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      256
                    </button>
                    <button class="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                      </svg>
                      68
                    </button>
                    <button class="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                      </svg>
                      Share
                    </button>
                  </div>
                  <a href="#" class="text-purple-400 hover:text-purple-300 text-sm">View Project</a>
                </div>
              </div>
            </div>
          </div>
        </div>
                </div>
            
    </>
  );
};

export default DevFeed;