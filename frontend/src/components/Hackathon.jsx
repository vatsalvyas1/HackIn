import AddHackathon from "./AddHackathon";
import { useState, useEffect } from "react";
import { backendUrl } from "../constanst";
import {
  Code,
  Bot,
  ScanEye,
  Database,
  LayoutTemplate,
  FileLock2,
  MonitorSmartphone,
  Cloud,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Hackathon() {
  const [hackathons, setHackathons] = useState([]);
  const backenUrl = "http://localhost:3000";

  const bg = {
    "bg-gradient-to-r from-blue-900 to-purple-900":
      "bg-gradient-to-r from-blue-900/50 to-purple-900/50",
    "bg-gradient-to-r from-green-900 to-teal-900":
      "bg-gradient-to-r from-green-900/50 to-teal-900/50",
    "bg-gradient-to-r from-red-900 to-orange-900":
      "bg-gradient-to-r from-red-900/50 to-orange-900/50",
    "bg-gradient-to-r from-indigo-900 to-blue-900":
      "bg-gradient-to-r from-indigo-900/50 to-blue-900/50",
    "bg-gradient-to-r from-purple-900 to-pink-900":
      "bg-gradient-to-r from-purple-900/50 to-pink-900/50",
    "bg-gradient-to-r from-yellow-900 to-amber-900":
      "bg-gradient-to-r from-yellow-900/50 to-amber-900/50",
  };

  const logobg = {
    "bg-gradient-to-r from-blue-900 to-purple-900":
      "bg-gradient-to-r from-blue-600 to-purple-600",
    "bg-gradient-to-r from-green-900 to-teal-900":
      "bg-gradient-to-r from-green-600 to-teal-600",
    "bg-gradient-to-r from-red-900 to-orange-900":
      "bg-gradient-to-r from-red-600 to-orange-600",
    "bg-gradient-to-r from-indigo-900 to-blue-900":
      "bg-gradient-to-r from-indigo-600 to-blue-600",
    "bg-gradient-to-r from-purple-900 to-pink-900":
      "bg-gradient-to-r from-purple-600 to-pink-600",
    "bg-gradient-to-r from-yellow-900 to-amber-900":
      "bg-gradient-to-r from-yellow-600 to-amber-600",
  };

  const logo = {
    Web3: <Code />,
    AI: <Bot />,
    "AR/VR": <ScanEye />,
    "Data & Gen AI": <Database />,
    IOT: <LayoutTemplate />,
    "Cyber Securtiy": <FileLock2 />,
    "Web & App Development": <MonitorSmartphone />,
    "Cloud & DevOps": <Cloud />,
    "Open Innovation": <BookOpen />,
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formattedStart = start.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
    const formattedEnd = end.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
    const year = start.getFullYear();

    return `${formattedStart}-${formattedEnd}, ${year}`;
  };

  useEffect(() => {
    const fetchHackathons = async () => {
      const res = await fetch(`${backenUrl}/api/v1/hackathon/get-hackathons`);
      const result = await res.json();
      setHackathons(result.data);
    };

    fetchHackathons();
  }, []);

  return (
    <div className="mx-1 md:mx-16 px-4 text-white pt-8 pb-16">
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/30 text-purple-400 border border-purple-800/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            Upcoming Events
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
          Discover <span className="text-purple-500">Hackathons</span>
        </h2>
        <p className="text-neutral-400 max-w-3xl mx-auto">
          Find and participate in exciting hackathons worldwide. Filter by
          location, date, and tech stack to find the perfect event for your
          team.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Upcoming Hackathons</h3>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                ></path>
              </svg>
              Sort By: Date
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons &&
            hackathons.map((hackathon) => (
              <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className={`h-40 relative ${bg[hackathon.colorTheme]}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center z-10">
                      <div
                        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg ${
                          logobg[hackathon.colorTheme]
                        }`}
                      >
                        {logo[hackathon.track]}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-white text-xs font-semibold px-2 py-1 rounded-md ${
                        logobg[hackathon.colorTheme]
                      }`}
                    >
                      {hackathon.track}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        new Date(hackathon.registrationDeadline) > new Date()
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-white text-xs">
                      {new Date(hackathon.registrationDeadline) > new Date()
                        ? "Registering"
                        : "Dates Out"}{" "}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-bold text-white mb-2">
                    {hackathon.name}
                  </h4>
                  <p className="text-neutral-400 text-sm mb-4">
                    {hackathon.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-neutral-400 text-xs mb-1">Date</div>
                      <div className="text-white text-sm font-medium">
                        {formatDateRange(
                          hackathon.startDate,
                          hackathon.endDate
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400 text-xs mb-1">
                        Location
                      </div>
                      <div className="text-white text-sm font-medium">
                        {hackathon.mode == "Offline"
                          ? hackathon.location.city +
                            ", " +
                            hackathon.location.state
                          : "Remote"}{" "}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-purple-400 text-sm font-medium">
                      ₹{hackathon.prizePool} Prize Pool
                    </div>
                    <Link
                      to={`/hackathon/${hackathon._id}`}
                      className="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-3 py-1 rounded transition-colors duration-300"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* <!-- View More Button --> */}
        <div className="text-center mt-10 mb-16">
          <a
            href="#"
            className="inline-flex items-center bg-purple-700 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            View All Hackathons
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <AddHackathon />
    </div>
  );
}
