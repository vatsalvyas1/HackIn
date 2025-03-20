import { useEffect, useState } from "react";
import TeamForm from "./TeamForm";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { MapPin, X, CircleAlert } from 'lucide-react';

export default function HackMates() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [joinMessageForm, setJoinMessageForm] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  
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

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const formattedStart = start.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const formattedEnd = end.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const year = start.getFullYear();
  
    return `${formattedStart}-${formattedEnd}, ${year}`;
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

  const handleChange = (e) => {
    setJoinMessage(e.target.value);
  }

  const handleApply = (teamId) => {
    setSelectedTeamId(teamId);
    setJoinMessageForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (joinMessage) await sendRequest(selectedTeamId);
    setJoinMessageForm(false);
    setJoinMessage("");
    setSelectedTeamId(null);
  };

  const sendRequest = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/team/join-team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamId,
          userId,
          message: joinMessage,
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
  }

  return (
    <>
      <div className={`mx-1 md:mx-16 px-4 text-white pb-20 pt-8 ${joinMessageForm ? 'blur-sm' : ''}`}>
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
                      <span className="text-white font-bold">{team.teamName.split(" ").map((item) => item[0])}</span>
                    </div>
                    <div className="ml-3">
                      <Link className="" to={`/team/${team._id}`}><h3 className="text-white font-medium hover:text-purple-500">{team.teamName}</h3></Link>
                      <div className="flex items-center text-neutral-400 text-sm">
                        <MapPin size={14} className="mr-1"/>
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
                      <span className="text-neutral-400 text-xs ml-2">{formatDateRange(team.dates.startDate,team.dates.endDate)}</span>
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
                        <img key={index} className="w-8 h-8 rounded-full border border-black" src={member.profileImage} alt={`Team member ${index + 1}`} />
                      ))}
                    </div>
                    {team.teamLeader !== userId ? (
                      team.teamMembers.some((member) => member._id.toString() === userId.toString()) ? (
                        <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">View Team</button>
                      ) : (
                        team.joinRequests.some((request) => (request.userId) === userId) ? (
                          <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">Request Sent</button>
                        ) : (
                          team.teamMembers.length < team.teamSize ? (
                            <button onClick={() => handleApply(team._id)} className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">Join Team</button>
                          ) : (
                            <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300">Team Full</button>
                          )
                        )
                        
                      )
                    ) : (
                      <Link
                        to={`/team/${team._id}`}
                        className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300"
                      >
                        Manage Team
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-neutral-400 flex flex-col items-center justify-center md:w-5xl bg-neutral-800 rounded-xl p-16 border border-neutral-700">
              <CircleAlert size={60} className="mb-2" />
              <p>No teams found. Try searching for a different team or hackathon.</p>
            </div> 
          )}
        </div>

        <TeamForm />
      </div>

      {/* Modal Popup for Join Message */}
      {joinMessageForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => {
                setJoinMessageForm(false);
                setJoinMessage("");
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-semibold mb-4 text-white">Apply to Join Team</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="joinMessage" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message to the Team
                </label>
                <textarea 
                  rows="4"
                  placeholder="Introduce yourself and explain why you'd like to join this team..."
                  name="joinMessage" 
                  id="joinMessage" 
                  required
                  value={joinMessage}
                  onChange={handleChange}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setJoinMessageForm(false);
                    setJoinMessage("");
                  }}
                  className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-6 py-2 rounded-lg transition-colors duration-300"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}