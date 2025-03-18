import { Search } from 'lucide-react';

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
                            <Search className='hidden md:block absolute right-4 top-2'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
