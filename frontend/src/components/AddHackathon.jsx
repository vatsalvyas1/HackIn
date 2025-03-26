import { Link } from "react-router-dom";

export default function AddHackathon(){
    return(
        <div className="text-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-8 overflow-hidden relative">
            <h1 className="text-3xl md:text-4xl mb-4 font-bold font-mono">Organising a <span className="text-purple-500">Hackathon</span></h1>
            <p className="text-neutral-300 max-w-3xl mx-auto mb-8">
                The only thing that can match the thrill of attending a hackathon is the 
                exhilaration of organizing one yourself! Join 100s of other hackathons on <span className="text-purple-500 font-bold">HackIn</span> and manage your applications, 
                submissions, comms, reimbursements, and judging, all on our platform.
            </p>
            <Link to={"/organise"} className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-8">Create a Hackathon</Link>
            <div className=" md:block rotate-20 absolute text-purple-200/20 font-medium top-15 right-[-10%] text-xl md:text-5xl font-mono">
                <p>{"</>"}101010101</p>
                <p>101110110101</p>
                <p>010101011100</p>
            </div>
        </div>
    )
}