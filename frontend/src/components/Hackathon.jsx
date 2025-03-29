import AddHackathon from "./AddHackathon";
import { useState, useEffect } from "react";
import { backendUrl } from "../constanst";

export default function Hackathon() {
    const [hackathons, setHackathons] = useState([]);
    const backenUrl = "http://localhost:3000";

    const bg = {
        "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-900/50 to-purple-900/50",
        "bg-gradient-to-r from-green-900 to-teal-900" : "bg-gradient-to-r from-green-900/50 to-teal-900/50",
        "bg-gradient-to-r from-red-900 to-orange-900" : "bg-gradient-to-r from-red-900/50 to-orange-900/50",
        "bg-gradient-to-r from-indigo-900 to-blue-900" : "bg-gradient-to-r from-indigo-900/50 to-blue-900/50",
        "bg-gradient-to-r from-purple-900 to-pink-900" : "bg-gradient-to-r from-purple-900/50 to-pink-900/50",
        "bg-gradient-to-r from-yellow-900 to-amber-900" : "bg-gradient-to-r from-yellow-900/50 to-amber-900/50",
    }

    const logobg = {
        "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-600 to-purple-600",
        "bg-gradient-to-r from-green-900 to-teal-900" : "bg-gradient-to-r from-green-600 to-teal-600",
        "bg-gradient-to-r from-red-900 to-orange-900" : "bg-gradient-to-r from-red-600 to-orange-600",
        "bg-gradient-to-r from-indigo-900 to-blue-900" : "bg-gradient-to-r from-indigo-600 to-blue-600",
        "bg-gradient-to-r from-purple-900 to-pink-900" : "bg-gradient-to-r from-purple-600 to-pink-600",
        "bg-gradient-to-r from-yellow-900 to-amber-900" : "bg-gradient-to-r from-yellow-600 to-amber-600",
    }

    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        const formattedStart = start.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        const formattedEnd = end.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        const year = start.getFullYear();
      
        return `${formattedStart}-${formattedEnd}, ${year}`;
      };

    useEffect(() => {
        const fetchHackathons = async () => {
            const res = await fetch(`${backenUrl}/api/v1/hackathon/get-hackathons`);
            const result = await res.json();
            console.log(result.data);
            setHackathons(result.data);
        }

        fetchHackathons();
    }, []);

    return(
        <div className="mx-1 md:mx-16 px-4 text-white pt-8 pb-16">
            <div className="text-center mb-16">
                <div className="inline-block mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/30 text-purple-400 border border-purple-800/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Upcoming Events
                </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">Discover <span className="text-purple-500">Hackathons</span></h2>
                <p className="text-neutral-400 max-w-3xl mx-auto">Find and participate in exciting hackathons worldwide. Filter by location, date, and tech stack to find the perfect event for your team.</p>
            </div>

            <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Upcoming Hackathons</h3>
                <div className="flex items-center space-x-2">
                    <button className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                    </svg>
                    Sort By: Date
                    </button>
                </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hackathons && hackathons.map((hackathon) => (
                        <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                            <div className={`h-40 relative ${bg[hackathon.colorTheme]}`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center z-10">
                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg ${logobg[hackathon.colorTheme]}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                    </svg>
                                </div>
                                </div>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className={`text-white text-xs font-semibold px-2 py-1 rounded-md ${logobg[hackathon.colorTheme]}`}>WEB3</span>
                            </div>
                            <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                                <div className={`w-2 h-2 rounded-full ${new Date(hackathon.registrationDeadline) > new Date() ? ("bg-green-500") : ("bg-red-500")}`}></div>
                                <span className="text-white text-xs">{new Date(hackathon.registrationDeadline) > new Date() ? ("Registering") : ("Dates Out")} </span>
                            </div>
                            </div>
                            
                            <div className="p-5">
                            <h4 className="text-lg font-bold text-white mb-2">{hackathon.name}</h4>
                            <p className="text-neutral-400 text-sm mb-4">{hackathon.description}</p>
                            
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                <div className="text-neutral-400 text-xs mb-1">Date</div>
                                <div className="text-white text-sm font-medium">{formatDateRange(hackathon.startDate,hackathon.endDate)}</div>
                                </div>
                                <div>
                                <div className="text-neutral-400 text-xs mb-1">Location</div>
                                <div className="text-white text-sm font-medium">{hackathon.mode == "Offline" ? (hackathon.location.city +", "+ hackathon.location.state) : ("Remote")} </div>
                                </div>
                            </div>
                            
                            {/* <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Ethereum</span>
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Solidity</span>
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Blockchain</span>
                            </div> */}
                            
                            <div className="flex justify-between items-center">
                                <div className="text-purple-400 text-sm font-medium">₹{hackathon.prizePool} Prize Pool</div>
                                <a href="#" className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300">Details</a>
                            </div>
                            </div>
                        </div>
                    ))}
                {/* <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    <div className="h-40 bg-gradient-to-r from-blue-900/50 to-purple-900/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">WEB3</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-white text-xs">Registering</span>
                    </div>
                    </div>
                    
                    <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2">ETH Global Hackathon</h4>
                    <p className="text-neutral-400 text-sm mb-4">Build decentralized applications on Ethereum and related technologies in this online event.</p>
                    
                    <div className="flex justify-between items-center mb-4">
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Date</div>
                        <div className="text-white text-sm font-medium">Nov 10-12, 2023</div>
                        </div>
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Location</div>
                        <div className="text-white text-sm font-medium">Virtual</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Ethereum</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Solidity</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Blockchain</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-purple-400 text-sm font-medium">$30,000 Prize Pool</div>
                        <a href="#" className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300">Details</a>
                    </div>
                    </div>
                </div>
                
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    <div className="h-40 bg-gradient-to-r from-green-900/50 to-teal-900/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">SUSTAINABILITY</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-white text-xs">Registering</span>
                    </div>
                    </div>
                    
                    <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2">Climate Tech Summit</h4>
                    <p className="text-neutral-400 text-sm mb-4">Create innovative solutions to combat climate change using technology and data science.</p>
                    
                    <div className="flex justify-between items-center mb-4">
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Date</div>
                        <div className="text-white text-sm font-medium">Oct 20-22, 2023</div>
                        </div>
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Location</div>
                        <div className="text-white text-sm font-medium">New York, USA</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">CleanTech</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">IoT</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Data Science</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-purple-400 text-sm font-medium">$25,000 Prize Pool</div>
                        <a href="#" className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300">Details</a>
                    </div>
                    </div>
                </div>
                
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    <div className="h-40 bg-gradient-to-r from-red-900/50 to-orange-900/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">MOBILE</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-white text-xs">Deadline Soon</span>
                    </div>
                    </div>
                    
                    <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2">Mobile App Innovation</h4>
                    <p className="text-neutral-400 text-sm mb-4">Build the next generation of mobile applications with cutting-edge features and experience.</p>
                    
                    <div className="flex justify-between items-center mb-4">
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Date</div>
                        <div className="text-white text-sm font-medium">Oct 13-15, 2023</div>
                        </div>
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Location</div>
                        <div className="text-white text-sm font-medium">Berlin, Germany</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">React Native</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Flutter</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Swift</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-purple-400 text-sm font-medium">$20,000 Prize Pool</div>
                        <a href="#" className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300">Details</a>
                    </div>
                    </div>
                </div>
                
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    <div className="h-40 bg-gradient-to-r from-indigo-900/50 to-blue-900/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-md">CLOUD</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-white text-xs">Registering</span>
                    </div>
                    </div>
                    
                    <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2">Cloud DevOps Challenge</h4>
                    <p className="text-neutral-400 text-sm mb-4">Create innovative solutions for cloud infrastructure, DevOps, and microservices architectures.</p>
                    
                    <div className="flex justify-between items-center mb-4">
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Date</div>
                        <div className="text-white text-sm font-medium">Nov 3-5, 2023</div>
                        </div>
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Location</div>
                        <div className="text-white text-sm font-medium">Singapore</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Kubernetes</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">AWS</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">DevOps</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-purple-400 text-sm font-medium">$15,000 Prize Pool</div>
                        <a href="#" className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300">Details</a>
                    </div>
                    </div>
                </div>
                
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    <div className="h-40 bg-gradient-to-r from-purple-900/50 to-pink-900/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-md">AR/VR</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-white text-xs">Registering</span>
                    </div>
                    </div>
                    
                    <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2">AR/VR Game Jam</h4>
                    <p className="text-neutral-400 text-sm mb-4">Create immersive augmented or virtual reality experiences that push the boundaries of gaming.</p>
                    
                    <div className="flex justify-between items-center mb-4">
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Date</div>
                        <div className="text-white text-sm font-medium">Nov 17-19, 2023</div>
                        </div>
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Location</div>
                        <div className="text-white text-sm font-medium">Tokyo, Japan</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Unity</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Unreal</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">ARKit</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-purple-400 text-sm font-medium">$22,000 Prize Pool</div>
                        <a href="#" className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300">Details</a>
                    </div>
                    </div>
                </div>
                
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    <div className="h-40 bg-gradient-to-r from-yellow-900/50 to-amber-900/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-600 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-md">EDTECH</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-white text-xs">Deadline Soon</span>
                    </div>
                    </div>
                    
                    <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2">EduTech Innovations</h4>
                    <p className="text-neutral-400 text-sm mb-4">Develop technological solutions to improve education and learning experiences worldwide.</p>
                    
                    <div className="flex justify-between items-center mb-4">
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Date</div>
                        <div className="text-white text-sm font-medium">Oct 27-29, 2023</div>
                        </div>
                        <div>
                        <div className="text-neutral-400 text-xs mb-1">Location</div>
                        <div className="text-white text-sm font-medium">Hybrid</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Web</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Mobile</span>
                        <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">AI</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-purple-400 text-sm font-medium">$18,000 Prize Pool</div>
                        <a href="#" className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300">Details</a>
                    </div>
                    </div>
                </div> */}
                </div>
                
                {/* <!-- View More Button --> */}
                <div className="text-center mt-10 mb-16">
                <a href="#" className="inline-flex items-center bg-purple-700 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                    View All Hackathons
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
                </div>
            </div>
            <AddHackathon />
        </div>
    )
};