export default function SearchBar({ searchQuery, onSearch }) {
    return (
        <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label htmlFor="search" className="block text-sm font-medium text-neutral-400 mb-1">
                            Search Teams
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                value={searchQuery}
                                onChange={(e) => onSearch(e.target.value)}
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
                </div>
            </div>
        </div>
    );
}
