import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Zap, 
  Link as LinkIcon, 
  Phone,
  ArrowLeft,
  FileText,
  School,
  Briefcase,
  Globe,
  PhoneCall,
  Users,
  UserPlus,
  UserCircle
} from 'lucide-react';
import { X, Plus } from "lucide-react";
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
import { backendUrl } from '../constanst.js';

export default function JoinHackathon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [hackathon, setHackathon] = useState(null);
  const [joinType, setJoinType] = useState(null); // 'individual', 'join-team', or 'create-team'
  const [addSkill, setAddSkill] = useState(false);
  const [skills, setSkills] = useState(["React", "NodeJS", "MongoDB"]);
  const [formdata, setFormData] = useState({
    teamName: "",
    hackathonName: "",
    description: "",
    teamSize: "",
    location: "",
    startDate: "",
    endDate: "",
    lookingFor: "",
    isLive : false,
  });
  const [addedSkills, setAddedSkills] = useState([]);

  const logo = {
    "Web3": <Code size={18}/>,
    "AI": <Bot />,
    "AR/VR": <ScanEye />,
    "Data & Gen AI": <Database />,
    "IOT": <LayoutTemplate />,
    "Cyber Securtiy": <FileLock2 />,
    "Web & App Development": <MonitorSmartphone />,
    "Cloud & DevOps": <Cloud size={32}/>,
    "Open Innovation": <BookOpen />,
  };
  const logobg = {
    "bg-gradient-to-r from-blue-900 to-purple-900": "bg-gradient-to-r from-blue-600 to-purple-600",
    "bg-gradient-to-r from-green-900 to-teal-900": "bg-gradient-to-r from-green-600 to-teal-600",
    "bg-gradient-to-r from-red-900 to-orange-900": "bg-gradient-to-r from-red-600 to-orange-600",
    "bg-gradient-to-r from-indigo-900 to-blue-900": "bg-gradient-to-r from-indigo-600 to-blue-600",
    "bg-gradient-to-r from-purple-900 to-pink-900": "bg-gradient-to-r from-purple-600 to-pink-600",
    "bg-gradient-to-r from-yellow-900 to-amber-900": "bg-gradient-to-r from-yellow-600 to-amber-600",
  };

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/hackathon/get-hackathon/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setHackathon(result.data);

        setFormData({
          ...formdata,
          hackathonName: result.data.name,
          startDate: result.data.startDate,
          endDate: result.data.endDate,
          location: result.data.location.city,
          teamSize: result.data.maxTeamSize,
        })
      } catch (error) {
        console.error('Error fetching hackathon:', error);
      }
    };
    fetchHackathon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser)._id;
    
    try {

      if(joinType == "individual") {
        setFormData({
          ...formdata,
          teamSize: 1,
        })
      }

      const teamResponse = await fetch(`${backendUrl}/api/v1/team/create-team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formdata,
          skills: addedSkills,
          userId,
        }),
      });
  
      if (!teamResponse.ok) {
        throw new Error("Failed to create team");
      }
  
      const teamResult = await teamResponse.json();
      const teamId = teamResult.data._id;
  
      const hackathonResponse = await fetch(
        `${backendUrl}/api/v1/hackathon/add-team-request/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teamId }),
        }
      );
  
      if (!hackathonResponse.ok) {
        throw new Error("Failed to register team for hackathon");
      }
      
      navigate(`/hackathon/${id}`);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const addSkills = (skill) => {
    setAddedSkills([...addedSkills, skill]);
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const removeSkill = (skill) => {
    setSkills([...skills, skill]);
    setAddedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const JoinTypeSelection = () => (
    <div className="max-w-2xl mx-auto bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl overflow-hidden">
      <div className="p-8">
        <div className={`w-12 h-12 flex justify-center items-center mx-auto mb-8 rounded-full ${logobg[hackathon?.colorTheme]}`}>
          {logo[hackathon?.track]}
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Join {hackathon?.name || 'Hackathon'}
        </h2>
        
        <p className="text-neutral-400 text-center mb-8">
          Choose how you'd like to participate in this hackathon
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setJoinType('individual')}
            className="bg-neutral-700 hover:bg-neutral-600 p-6 rounded-xl border border-neutral-600 transition-all duration-300 hover:border-purple-500 group"
          >
            <div className="flex flex-col items-center text-center">
              <UserCircle className="w-12 h-12 mb-4 text-purple-400 group-hover:text-purple-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Individual Application</h3>
              <p className="text-sm text-neutral-400">Submit your application as an individual participant</p>
            </div>
          </button>

          <button
            onClick={() => setJoinType('join-team')}
            className="bg-neutral-700 hover:bg-neutral-600 p-6 rounded-xl border border-neutral-600 transition-all duration-300 hover:border-purple-500 group"
          >
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 mb-4 text-purple-400 group-hover:text-purple-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Join a Team</h3>
              <p className="text-sm text-neutral-400">Find and join an existing team</p>
            </div>
          </button>

          <button
            onClick={() => setJoinType('create-team')}
            className="bg-neutral-700 hover:bg-neutral-600 p-6 rounded-xl border border-neutral-600 transition-all duration-300 hover:border-purple-500 group"
          >
            <div className="flex flex-col items-center text-center">
              <UserPlus className="w-12 h-12 mb-4 text-purple-400 group-hover:text-purple-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Create a Team</h3>
              <p className="text-sm text-neutral-400">Start a new team and invite others</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const OverviewScreen = () => (
    <div className="max-w-2xl mx-auto bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-center mb-8">
          <div className={`w-16 h-16 flex justify-center items-center mx-auto rounded-full ${logobg[hackathon?.colorTheme]}`}>
            {logo[hackathon?.track]}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {hackathon?.name || 'Hackathon'} Application
        </h2>
        
        <div className="text-center mb-8">
          <p className="text-neutral-400">
            Submitting your application will share the following with {hackathon?.name || 'hackathon'} organizers
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="bg-neutral-700 p-2 rounded-lg">
              <User className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">About</h3>
              <p className="text-neutral-400 text-sm">Your username, first name, last name, and gender.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-neutral-700 p-2 rounded-lg">
              <School className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Education</h3>
              <p className="text-neutral-400 text-sm">Your educational institution, field of study and graduation month & year.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-neutral-700 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Experience</h3>
              <p className="text-neutral-400 text-sm">Your skills.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-neutral-700 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Links</h3>
              <p className="text-neutral-400 text-sm">Your GitHub and LinkedIn profile links.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-neutral-700 p-2 rounded-lg">
              <PhoneCall className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Contact</h3>
              <p className="text-neutral-400 text-sm">Your city, email, and phone number.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Continue to the application
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => {
            if (showForm) {
              setShowForm(false);
            } else if (joinType) {
              setJoinType(null);
            } else {
              navigate(`/hackathon/${id}`);
            }
          }}
          className="flex items-center text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {showForm ? 'Back to Overview' : joinType ? 'Back to Join Options' : 'Back to Hackathon'}
        </button>

        {!joinType ? (
          <JoinTypeSelection />
        ) : !showForm ? (
          <OverviewScreen />
        ) : (
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl overflow-hidden">
            {joinType === 'individual' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-center mb-2">
                  Individual Application
                </h2>

                <form
                  onSubmit={handleSubmit}
                  method="post"
                  className="bg-neutral-800 rounded-xl p-6 border border-neutral-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="team-name"
                        className="block text-sm font-medium text-neutral-400 mb-1"
                      >
                        Team Name
                      </label>
                      <input
                        type="text"
                        id="team-name"
                        name="teamName"
                        value={formdata.teamName}
                        onChange={handleChange}
                        placeholder="Enter your team name"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                      onClick={handleSubmit}
                    >
                      Join Now
                    </button>
                  </div>
                </form>

              </div>
            )}

            {joinType === 'join-team' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-center mb-2">
                  Join a Team
                </h2>

                <form action="">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Please Enter your Team Code
                    </label>
                    <input
                      type="text"
                      name="teamCode"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                      placeholder="Enter team code"
                      required
                    />

                    <div className='flex justify-center mt-4'>
                      <button className='bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300'>
                        Sent Team Request
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {joinType === 'create-team' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-center mb-2">
                  Create a Team
                </h2>

                <form
                  onSubmit={handleSubmit}
                  method="post"
                  className="bg-neutral-800 rounded-xl p-6 border border-neutral-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="team-name"
                        className="block text-sm font-medium text-neutral-400 mb-1"
                      >
                        Team Name
                      </label>
                      <input
                        type="text"
                        id="team-name"
                        name="teamName"
                        value={formdata.teamName}
                        onChange={handleChange}
                        placeholder="Enter your team name"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-neutral-400 mb-1"
                    >
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      rows="3"
                      name="description"
                      value={formdata.description}
                      onChange={handleChange}
                      placeholder="Describe your project and what you're building..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div>
                    <p>Wanted to find teamMates too : </p>
                    <label htmlFor="isLive">Yes</label>
                    <input 
                      type="radio" 
                      name="isLive" 
                      id="isLive" 
                      value="true"  
                      checked={formdata.isLive === true}
                      onChange={handleChange}
                    />
                    <label htmlFor="notLive">No</label>
                    <input 
                      type="radio" 
                      name="isLive" 
                      id="notLive" 
                      value="false" 
                      checked={formdata.isLive === false}
                      onChange={handleChange}
                    />
                  </div>

                  {formdata.isLive && (
                    <div>
                      <div className="mb-6">
                          <label
                            htmlFor="lookingFor"
                            className="block text-sm font-medium text-neutral-400 mb-1"
                          >
                            Looking For{" "}
                            <span className="text-neutral-500">(comma separated values)</span>
                          </label>
                          <input
                            type="text"
                            id="lookingFor"
                            name="lookingFor"
                            value={formdata.lookingFor}
                            onChange={handleChange}
                            placeholder="e.g., Frontend Dev, UI/UX Designer, AI Engineer"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-neutral-400 mb-1">
                            Skills Needed
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {addedSkills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-purple-900/30 text-purple-400 text-xs py-1 px-3 rounded-full border border-purple-800/30 flex items-center font-mono cursor-pointer hover:bg-purple-800/60 transition-colors"
                                onClick={() => removeSkill(skill)}
                              >
                                {skill}
                                <X size={16} className="ml-1" />
                              </span>
                            ))}
                            <button
                              type="button"
                              onClick={() => setAddSkill(!addSkill)}
                              className="bg-neutral-700 hover:bg-neutral-600 text-white text-xs py-1 px-3 rounded-full transition-colors duration-300 flex items-center font-mono"
                            >
                              {addSkill ? (
                                <X size={16} className="mr-1" />
                              ) : (
                                <Plus size={16} className="mr-1" />
                              )}
                              Add Skill
                            </button>
                          </div>
                          {addSkill && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-neutral-900 text-white text-xs py-1 px-3 rounded-full border border-neutral-700 flex items-center font-mono cursor-pointer hover:bg-neutral-800 transition-colors"
                                  onClick={() => addSkills(skill)}
                                >
                                  {skill}
                                  <Plus size={16} className="ml-1" />
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                      onClick={handleSubmit}
                    >
                      Create Team
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}