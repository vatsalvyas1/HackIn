import { useEffect, useState } from "react";
import TeamForm from "./TeamForm";
import SearchBar from "./SearchBar";

export default function HackMates() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const logoCss = {
    1: "bg-indigo-600",
    2: "bg-purple-600",
    3: "bg-blue-600",
    4: "bg-red-600",
    5: "bg-green-600",
  };
  const hackathonCss = {
    1: "bg-indigo-900/30 text-indigo-400",
    2: "bg-purple-900/30 text-purple-400",
    3: "bg-blue-900/30 text-blue-400",
    4: "bg-red-900/30 text-red-400",
    5: "bg-green-900/30 text-green-400",
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser)._id : null;
    setUserId(user);

    const fetchAllTeams = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/team/get-all", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("something went wrong");
        }

        const result = await response.json();
        setTeams(result.data);
        setFilteredTeams(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllTeams();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teams.filter((team) =>
      team.teamName.toLowerCase().includes(query.toLowerCase()) ||
      team.hackathonName.toLowerCase().includes(query.toLowerCase()) ||
      team.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredTeams(filtered);
  };

  const handleApply = async (teamId) => {
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser)._id : null;
    console.log(teamId, userId);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/team/join-team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamId,
          userId,
          message: "I am interested in joining your team",
        }),
      });

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const result = await response.json();
      console.log("request sent");
    } catch (err) {
      console.log(err);
    }
  };

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

      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team, index) => (
            <div key={index} className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between p-4 border-b border-neutral-700 bg-neutral-800">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${logoCss[Math.floor(Math.random() * 5) + 1]}`}>
                    <span className="text-white font-bold">{team.teamName[0]}</span>
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
                    {team.lookingFor.map((item, index) => (
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
                  {team.skills.map((skill, index) => (
                    <span key={index} className="bg-neutral-900 text-neutral-400 text-xs px-2 py-1 rounded border border-neutral-700">{skill}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {team.teamMembers.map((member, index) => (
                      <img key={index} className="w-8 h-8 rounded-full border" src={member.profileImage} />
                    ))}
                  </div>
                  {team.teamLeader !== userId ? (
                    <button
                      className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300"
                      onClick={() => handleApply(team._id)}
                    >
                      Apply to Join
                    </button>
                  ) : (
                    <button
                      className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Edit Team
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-400">No teams found.</p>
        )}
      </div>

      <TeamForm />
    </div>
  );
}