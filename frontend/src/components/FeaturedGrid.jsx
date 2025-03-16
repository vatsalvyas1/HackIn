import { Newspaper, Users, BadgeCheck, Clock, CircleCheck, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

export default function FeaturedGrid() {
    return (
        <div>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                    Platform <span className="text-purple-500">Features</span>
                </h2>
                <p className="text-neutral-400 max-w-3xl mx-auto">
                    Everything you need to connect with like-minded developers, find teammates, showcase your skills, and participate in global hackathons.
                </p>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div id="hackmates-preview" className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition-colors duration-300">
                    <Users size={24} className='text-purple-400'/>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Hackmates</h3>
                    <p className="text-neutral-400 mb-4">Find the perfect teammates for your next hackathon or join an existing team looking for your skills.</p>
                    <ul className="space-y-2 text-neutral-300">
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Skill-based matching
                    </li>
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Team vacancy posts
                    </li>
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Direct team applications
                    </li>
                    </ul>
                    <Link to={"/hackmates"} className="mt-6 inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-2 transition-transform duration-300">
                    Find Teammates
                    <ArrowRight size={18} className='ml-1' />
                    </Link>
                </div>
        
                <div id="leaderboard-preview" className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition-colors duration-300">
                    <BadgeCheck size={24} className='text-purple-400'/>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Leaderboard</h3>
                    <p className="text-neutral-400 mb-4">Global rankings of top developer teams based on hackathon wins, participation points, and achievements.</p>
                    <ul className="space-y-2 text-neutral-300">
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Worldwide rankings
                    </li>
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Country/college filters
                    </li>
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Trophy system
                    </li>
                    </ul>
                    <a href="#" className="mt-6 inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-2 transition-transform duration-300">
                    View Rankings
                    <ArrowRight size={18} className='ml-1' />
                    </a>
                </div>
        
                <div id="hackathons-preview" className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition-colors duration-300">
                    <Clock size={24} className='text-purple-400'/>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Hackathons</h3>
                    <p className="text-neutral-400 mb-4">Discover ongoing and upcoming hackathons worldwide. Filter by location, tech stack, or prizes.</p>
                    <ul className="space-y-2 text-neutral-300">
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Global event listings
                    </li>
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Location-based filters
                    </li>
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Registration integration
                    </li>
                    </ul>
                    <a href="#" className="mt-6 inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-2 transition-transform duration-300">
                    Find Hackathons
                    <ArrowRight size={18} className='ml-1' />
                    </a>
                </div>

                <div id="home-preview" className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition-colors duration-300">
                    <Newspaper size={24} className='text-purple-400'/>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Developer Feed</h3>
                    <p className="text-neutral-400 mb-4">Your personalized feed of tech posts, projects, and discussions from the developer community.</p>
                    <ul className="space-y-2 text-neutral-300">
                    <li className="flex items-center">
                        <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Tech-focused discussions
                    </li>
                    <li className="flex items-center">
                    <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Project showcases
                    </li>
                    <li className="flex items-center">
                    <CircleCheck size={18} className='text-purple-500 mr-2'/>
                        Team updates
                    </li>
                    </ul>
                    <a href="#" className="mt-6 inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-2 transition-transform duration-300">
                    Explore Feed
                    <ArrowRight size={18} className='ml-1' />
                    </a>
                </div>
            </div>
        </div>
    )
}