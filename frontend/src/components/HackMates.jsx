import { useEffect, useState } from "react";
import TeamForm from "./TeamForm";

export default function HackMates() {
    const [teams,setTeams] = useState([]);
    const logoCss = {
        1: "bg-indigo-600",
        2: "bg-purple-600",
        3: "bg-blue-600",
        4: "bg-red-600",
        5: "bg-green-600"
    }
    const hackathonCss = {
        1: "bg-indigo-900/30 text-indigo-400",
        2: "bg-purple-900/30 text-purple-400",
        3: "bg-blue-900/30 text-blue-400",
        4: "bg-red-900/30 text-red-400",
        5: "bg-green-900/30 text-green-400",
    };

    useEffect(()=>{
        const fetchAllTeams = async() => {
            try{
                const response = await fetch("http://localhost:3000/api/v1/team/get-all",
                    {
                        method: "GET"
                    }
                )

                if(!response.ok){
                    throw new Error("something went wrong");
                }

                const result = await response.json();
                setTeams(result.data);
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchAllTeams();
    },[])

    return (
        <div className="mx-1 md:mx-16 px-4 text-white pb-20 pt-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                    Find Your <span className="text-purple-500">Hackmates</span>
                </h2>
                <p className="text-neutral-400 max-w-3xl mx-auto">
                    Connect with talented developers or join existing teams for your next hackathon challenge. Build the perfect team with complementary skills and shared goals.
                </p>
            </div>

            <div className="max-w-5xl mx-auto mb-10">
                <div className="bg-neutral-800 rounded-lg p-1 flex flex-wrap">
                    <button className="flex-1 py-3 px-4 rounded-md bg-purple-700 text-white font-medium">Find Teams</button>
                    <button className="flex-1 py-3 px-4 rounded-md text-neutral-300 hover:text-white transition-colors duration-300">Find Teammates</button>
                    <button className="flex-1 py-3 px-4 rounded-md text-neutral-300 hover:text-white transition-colors duration-300">My Applications</button>
                </div>
            </div>

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

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams && teams.map((team,index) => (
                    <div key={index} className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between p-4 border-b border-neutral-700 bg-neutral-800">
                            <div className="flex items-center">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${logoCss[Math.floor(Math.random()*5)+1]}`}>
                                    <span className="text-white font-bold">QD</span>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-white font-medium">{team.teamName}</h3>
                                    <div className="flex items-center text-neutral-400 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        {team.location}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                                {team.teamMembers.length}/{team.teamSize} Members
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <h4 className="text-white font-medium mb-2">Looking for:</h4>
                                <div className="flex flex-wrap gap-2 font-mono">
                                    {team.lookingFor.map((item,index) => (
                                        <span key={index} className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">{item}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-white font-medium mb-2">Hackathon:</h4>
                                <div className="flex items-center">
                                    <span className={`text-xs px-3 py-1 rounded-full ${hackathonCss[Math.floor(Math.random() * 5) + 1]}`}>{team.hackathonName}</span>
                                    <span className="text-neutral-400 text-xs ml-2">Oct 7-8, 2023</span>
                                </div>
                            </div>

                            <p className="text-neutral-400 text-sm mb-4">
                                {team.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4 font-mono">
                                {team.skills.map((skill,index) => (
                                    <span key={index} className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">{skill}</span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">JK</div>
                                    <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">RS</div>
                                </div>
                                <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">
                                    Apply to Join
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between p-4 border-b border-neutral-700 bg-neutral-800">
                        <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${logoCss[Math.floor(Math.random()*5)+1]}`}>
                                <span className="text-white font-bold">QD</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-white font-medium">Quantum Devs</h3>
                                <div className="flex items-center text-neutral-400 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    Remote Team
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                            2/4 Members
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Looking for:</h4>
                            <div className="flex flex-wrap gap-2 font-mono">
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Frontend Dev</span>
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">UI/UX Designer</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Hackathon:</h4>
                            <div className="flex items-center">
                                <span className={`text-xs px-3 py-1 rounded-full ${hackathonCss[Math.floor(Math.random() * 5) + 1]}`}>NASA Space Apps Challenge</span>
                                <span className="text-neutral-400 text-xs ml-2">Oct 7-8, 2023</span>
                            </div>
                        </div>

                        <p className="text-neutral-400 text-sm mb-4">
                            We're building a platform that uses satellite imagery and machine learning to predict climate change effects. Looking for frontend developers and UI/UX designers to join our team!
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4 font-mono">
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">React</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Python</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">TensorFlow</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Figma</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">JK</div>
                                <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">RS</div>
                            </div>
                            <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">
                                Apply to Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between p-4 border-b border-neutral-700 bg-neutral-800">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold">CB</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-white font-medium">CryptoBridge</h3>
                                <div className="flex items-center text-neutral-400 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    New York, USA
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                            3/5 Members
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Looking for:</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Blockchain Dev</span>
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Backend Dev</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Hackathon:</h4>
                            <div className="flex items-center">
                                <span className={`text-xs px-3 py-1 rounded-full ${hackathonCss[Math.floor(Math.random() * 5) + 1]}`}>ETH Global Hackathon</span>
                                <span className="text-neutral-400 text-xs ml-2">Nov 10-12, 2023</span>
                            </div>
                        </div>

                        <p className="text-neutral-400 text-sm mb-4">
                            Our team is building a decentralized finance solution that bridges multiple blockchains. We're looking for experienced blockchain and backend developers!
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Solidity</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Node.js</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Ethereum</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Web3.js</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">MC</div>
                                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">PT</div>
                                <div className="w-8 h-8 rounded-full bg-yellow-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">AK</div>
                            </div>
                            <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">
                                Apply to Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between p-4 border-b border-neutral-700 bg-neutral-800">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold">AI</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-white font-medium">AI Innovators</h3>
                                <div className="flex items-center text-neutral-400 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    San Francisco, USA
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                            1/3 Members
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Looking for:</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">ML Engineer</span>
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Data Scientist</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Hackathon:</h4>
                            <div className="flex items-center">
                                <span className={`text-xs px-3 py-1 rounded-full ${hackathonCss[Math.floor(Math.random() * 5) + 1]}`}>Global AI Challenge</span>
                                <span className="text-neutral-400 text-xs ml-2">Dec 2-3, 2023</span>
                            </div>
                        </div>

                        <p className="text-neutral-400 text-sm mb-4">
                            Building an AI-powered solution for healthcare diagnostics. Looking for ML engineers and data scientists with experience in medical data analysis.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Python</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">TensorFlow</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">PyTorch</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Pandas</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">MJ</div>
                            </div>
                            <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">
                                Apply to Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between p-4 border-b border-neutral-700 bg-neutral-800">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
                                <span className="text-white font-bold">WD</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-white font-medium">WebDevs Unite</h3>
                                <div className="flex items-center text-neutral-400 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    London, UK
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                            2/5 Members
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Looking for:</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Frontend Dev</span>
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">Backend Dev</span>
                                <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded">DevOps</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">Hackathon:</h4>
                            <div className="flex items-center">
                                <span className={`text-xs px-3 py-1 rounded-full ${hackathonCss[Math.floor(Math.random() * 5) + 1]}`}>Web Dev Jam</span>
                                <span className="text-neutral-400 text-xs ml-2">Oct 20-22, 2023</span>
                            </div>
                        </div>

                        <p className="text-neutral-400 text-sm mb-4">
                            Creating an all-in-one developer productivity platform. Looking for diverse skills including frontend, backend, and DevOps experience.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Vue.js</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Django</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">Docker</span>
                            <span className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">AWS</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">SD</div>
                                <div className="w-8 h-8 rounded-full bg-yellow-600 border-2 border-neutral-800 flex items-center justify-center text-xs text-white">LM</div>
                            </div>
                            <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">
                                Apply to Join
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>

            <TeamForm />
        </div>
    );
}