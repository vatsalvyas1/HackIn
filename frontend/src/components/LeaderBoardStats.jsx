import { useState, useEffect } from "react";
import { backendUrl } from "../constanst.js";
import { User, CircleCheckBig, Users } from 'lucide-react';

export default function LeaderBoardStats() {
  const [teams,setTeams] = useState(0);
  const [developers,setDevelopers] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const usersresponse = await fetch(`${backendUrl}/api/v1/users/get-scores`);
      const usersresult = await usersresponse.json();
      setDevelopers(usersresult.data.length);

      const teamsresponse = await fetch(`${backendUrl}/api/v1/team/get-all`);
      const teamsresult = await teamsresponse.json();
      setTeams(teamsresult.data.length);
    }
    fetchStats();
  },[]);

    return(
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="bg-neutral-800 rounded-xl p-6 border border-neutral-700 text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mx-auto mb-4">
            <Users size={32} color="#b182e3"/>
          </div>
          <h3 class="text-lg font-medium text-white mb-1">Total Teams</h3>
          <p class="text-3xl font-bold text-purple-500 mb-1">{teams}</p>
          <p class="text-neutral-400 text-sm">From 128 countries</p>
        </div>
        
        <div class="bg-neutral-800 rounded-xl p-6 border border-neutral-700 text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mx-auto mb-4">
            <User size={32} color="#b182e3"/>
          </div>
          <h3 class="text-lg font-medium text-white mb-1">Total Developers</h3>
          <p class="text-3xl font-bold text-purple-500 mb-1">{developers}</p>
          <p class="text-neutral-400 text-sm">Active participants</p>
        </div>
        
        <div class="bg-neutral-800 rounded-xl p-6 border border-neutral-700 text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mx-auto mb-4">
            <CircleCheckBig size={32} color="#b182e3"/>
          </div>
          <h3 class="text-lg font-medium text-white mb-1">Hackathons Completed</h3>
          <p class="text-3xl font-bold text-purple-500 mb-1">340</p>
          <p class="text-neutral-400 text-sm">This year</p>
        </div>
      </div>
    )
}