export default function SearchBar() {
    return (
        <div className="max-w-5xl mx-auto mb-8">
                <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label htmlFor="search" className="block text-sm font-medium text-neutral-400 mb-1">Search Teams</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by name, skills, or hackathon..."
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-neutral-400 absolute right-3 top-2.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="skills" className="block text-sm font-medium text-neutral-400 mb-1">Skills</label>
                            <select
                                id="skills"
                                className="w-full md:w-48 bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                            >
                                <option>All Skills</option>
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>UI/UX</option>
                                <option>Machine Learning</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="hackathon" className="block text-sm font-medium text-neutral-400 mb-1">Hackathon</label>
                            <select
                                id="hackathon"
                                className="w-full md:w-48 bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                            >
                                <option>All Hackathons</option>
                                <option>Global AI Challenge</option>
                                <option>Crypto Hackathon</option>
                                <option>NASA Space Apps</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-900/40 text-purple-400 text-xs py-1 px-3 rounded-full border border-purple-800/30 flex items-center">
                            Frontend
                            <button className="ml-1 text-purple-400 hover:text-purple-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </span>
                        <span className="bg-purple-900/40 text-purple-400 text-xs py-1 px-3 rounded-full border border-purple-800/30 flex items-center">
                            NASA Space Apps
                            <button className="ml-1 text-purple-400 hover:text-purple-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </span>
                        <button className="text-neutral-400 hover:text-white text-xs transition-colors duration-300">Clear All</button>
                    </div>
                </div>
            </div>
    )
}