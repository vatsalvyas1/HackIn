import { useEffect, useState } from "react";
import { backendUrl } from "../constanst.js";
import { Crown, Flame, Lightbulb, Zap, PlayCircle as CirclePlay, Trophy } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function LeaderBoardTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/team/get-all`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      setTeams(result.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const getTeamLength = (userId) => {
    const userTeams = teams.filter((team) => team.teamMembers.map((member) => member._id).includes(userId));
    return userTeams.length;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/users/get-scores`);
        const result = await response.json();
        setUsers(result.data);
        setTotalPages(Math.ceil(result.data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchTeams();
  }, []);

  // Get paginated users
  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  // Handle page changes
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages - 1) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - (maxVisiblePages - 2)) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
          <p className="mt-4 text-neutral-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const topThreeUsers = users.slice(0, 3);
  const paginatedUsers = getPaginatedUsers();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        {/* Leaderboard Top 3 */}
        <div className="flex flex-col md:flex-row justify-between p-6 bg-neutral-800 border-b border-neutral-700">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 w-full md:w-1/3 px-4 py-6 flex flex-col items-center">
            <div className="relative">
              <img 
                src={topThreeUsers[1]?.profileImage}
                alt="Profile Image"
                className="w-20 h-20 rounded-full" 
              />
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
                <Zap size={14} />
              </div>
            </div>
            <div className="bg-neutral-900 text-neutral-300 rounded-full px-4 py-1 text-sm mb-2 mt-2">#2</div>
            <h3 className="text-white font-medium text-lg mb-1 cursor-pointer" onClick={() => navigate("/dashboard", {state: {userId: topThreeUsers[1]?._id} })}>{topThreeUsers[1]?.name}</h3>
            <div className="mt-3 flex items-center bg-neutral-900 rounded-full px-4 py-1">
              <CirclePlay size={16} color="#d69e2e" className="mr-1"/>
              <span className="text-yellow-500 font-bold">{topThreeUsers[1]?.contributionScore} 🏆</span>
            </div>
          </div>
          
          {/* 1st Place */}
          <div className="order-1 md:order-2 w-full md:w-1/3 px-4 pb-6 flex flex-col items-center">
            <div className="w-8 h-8 mb-1">
              <Crown size={24} color="#d69e2e"/>
            </div>
            <div className="relative mt-1">
              <img 
                src={topThreeUsers[0]?.profileImage} 
                alt="Profile Image"
                className="w-24 h-24 rounded-full" 
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/96";
                }}
              />
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
                <Flame size={14} color="#fc8181"/>
              </div>
            </div>
            <div className="bg-yellow-500 text-black rounded-full px-4 py-1 text-sm font-bold mb-2 mt-2">#1</div>
            <h3 className="text-white font-semibold text-xl mb-1 cursor-pointer" onClick={() => navigate("/dashboard", {state: {userId: topThreeUsers[0]?._id} })}>{topThreeUsers[0]?.name}</h3>
            <div className="mt-3 flex items-center bg-yellow-500/20 rounded-full px-4 py-1 border border-yellow-500/30">
              <CirclePlay size={16} color="#d69e2e" className="mr-1"/>
              <span className="text-yellow-500 font-bold">{topThreeUsers[0]?.contributionScore} 🏆</span>
            </div>
          </div>
          
          {/* 3rd Place */}
          <div className="order-3 w-full md:w-1/3 px-4 py-6 flex flex-col items-center">
            <div className="relative">
              <img 
                src={topThreeUsers[2]?.profileImage}
                alt="Profile Image"
                className="w-20 h-20 rounded-full" 
              />
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
                <Lightbulb size={14} color="skyblue"/>
              </div>
            </div>
            <div className="bg-neutral-900 text-neutral-300 rounded-full px-4 py-1 text-sm mb-2 mt-2">#3</div>
            <h3 className="text-white font-medium text-lg mb-1 cursor-pointer" onClick={() => navigate("/dashboard", {state: {userId: topThreeUsers[2]?._id} })}>{topThreeUsers[2]?.name}</h3>
            <div className="mt-3 flex items-center bg-neutral-900 rounded-full px-4 py-1">
              <CirclePlay size={16} color="#d69e2e" className="mr-1"/>
              <span className="text-yellow-500 font-bold">{topThreeUsers[2]?.contributionScore} 🏆</span>
            </div>
          </div>
        </div>
        
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-neutral-900 py-3 px-6 border-b border-neutral-700 font-medium text-sm text-neutral-400">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">User</div>
          <div className="col-span-3">Active Teams</div>
          <div className="col-span-2">Wins</div>
          <div className="col-span-2">Trophy Points</div>
        </div>
        
        {/* Table Rows */}
        <div className="divide-y divide-neutral-700">
          {paginatedUsers.map((user, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            return (
              <div key={index} className="grid grid-cols-12 py-4 px-6 items-center hover:bg-neutral-800/50 transition-colors duration-200">
                <div className="col-span-1 font-bold text-neutral-400"># {globalIndex + 1}</div>
                <div className="col-span-4">
                  <div className="flex items-center">
                    <div onClick={() => navigate("/dashboard", { state: { userId: user._id } })} className="flex items-center cursor-pointer">
                      <img src={user.profileImage} className="w-10 h-10 rounded-full mr-3" alt={user.name} />
                      <div>
                        <h4 className="text-white font-medium">{user.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 text-neutral-300 pl-8">{getTeamLength(user._id)}</div>
                <div className="col-span-2 text-neutral-300 pl-4">6</div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <span className="text-purple-400 font-medium">{user.contributionScore} 🏆</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-6 border-t border-neutral-700 flex justify-between items-center">
          <div className="text-neutral-400 text-sm">
            Showing <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="text-white">{Math.min(currentPage * itemsPerPage, users.length)}</span> of{" "}
            <span className="text-white">{users.length}</span> teams
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300"
            >
              Previous
            </button>
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? 'bg-purple-700 text-white'
                    : 'bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300'
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}