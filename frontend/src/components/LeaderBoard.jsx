import LeaderBoardStats from "./LeaderBoardStats";
import LeaderBoardTable from "./LeaderBoardTable";
import TrophyInfo from "./TrophyInfo";

export default function LeaderBoard() {
    return (
        <div className="text-white mx-1 md:mx-16 pt-8 pb-16 px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">Global <span class="text-purple-500">Leaderboard</span></h2>
                <p class="text-neutral-400 max-w-3xl mx-auto">Track the most accomplished developer teams worldwide. Rankings based on hackathon victories, participation points, and project achievements.</p>
            </div>

            <LeaderBoardStats />
            <LeaderBoardTable />
            <TrophyInfo />
        </div>
    )
}