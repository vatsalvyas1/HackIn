export default function LeaderBoardStats() {
    return(
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="bg-neutral-800 rounded-xl p-6 border border-neutral-700 text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-white mb-1">Total Teams</h3>
          <p class="text-3xl font-bold text-purple-500 mb-1">5,280</p>
          <p class="text-neutral-400 text-sm">From 128 countries</p>
        </div>
        
        <div class="bg-neutral-800 rounded-xl p-6 border border-neutral-700 text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-white mb-1">Total Developers</h3>
          <p class="text-3xl font-bold text-purple-500 mb-1">18,740</p>
          <p class="text-neutral-400 text-sm">Active participants</p>
        </div>
        
        <div class="bg-neutral-800 rounded-xl p-6 border border-neutral-700 text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-white mb-1">Hackathons Completed</h3>
          <p class="text-3xl font-bold text-purple-500 mb-1">340</p>
          <p class="text-neutral-400 text-sm">This year</p>
        </div>
      </div>
    )
}