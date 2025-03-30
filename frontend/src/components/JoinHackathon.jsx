import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { backendUrl } from '../constanst.js';
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

export default function JoinHackathon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [hackathon, setHackathon] = useState(null);
  const [joinType, setJoinType] = useState(null); // 'individual', 'join-team', or 'create-team'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    institution: '',
    fieldOfStudy: '',
    graduationYear: '',
    graduationMonth: '',
    skills: '',
    githubLink: '',
    linkedinLink: '',
    city: '',
    email: '',
    phone: ''
  });
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
      } catch (error) {
        console.error('Error fetching hackathon:', error);
      }
    };
    fetchHackathon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/v1/hackathon/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, joinType })
      });
      
      if (response.ok) {
        navigate(`/hackathon/${id}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
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
          <img 
            src={hackathon?.logo || 'https://via.placeholder.com/64'} 
            alt="Hackathon logo" 
            className="w-16 h-16 rounded-lg"
          />
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
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-purple-600 rounded-full p-4">
                  <User className="w-8 h-8" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2">
                {joinType === 'individual' ? 'Individual Application' : 
                 joinType === 'join-team' ? 'Join a Team' : 'Create a Team'}
              </h2>
              <p className="text-neutral-400 text-center mb-8">
                Please fill out the form below to submit your application
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Education
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          name="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-1">
                            Graduation Month
                          </label>
                          <select
                            name="graduationMonth"
                            value={formData.graduationMonth}
                            onChange={handleChange}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                            required
                          >
                            <option value="">Select Month</option>
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-1">
                            Graduation Year
                          </label>
                          <select
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                            required
                          >
                            <option value="">Select Year</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Experience
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Skills
                      </label>
                      <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        rows="3"
                        placeholder="List your relevant skills..."
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <LinkIcon className="w-5 h-5 mr-2" />
                      Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          GitHub Profile
                        </label>
                        <input
                          type="url"
                          name="githubLink"
                          value={formData.githubLink}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          placeholder="https://github.com/username"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedinLink"
                          value={formData.linkedinLink}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          placeholder="https://linkedin.com/in/username"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-700">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {(joinType === 'join-team' || joinType === 'create-team') && (
                    <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-700">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        {joinType === 'join-team' ? 'Team Information' : 'Create Team'}
                      </h3>
                      {joinType === 'join-team' ? (
                        <div>
                          <label className="block text-sm font-medium text-neutral-300 mb-1">
                            Team Code
                          </label>
                          <input
                            type="text"
                            name="teamCode"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                            placeholder="Enter team code"
                            required
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">
                              Team Name
                            </label>
                            <input
                              type="text"
                              name="teamName"
                              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                              placeholder="Enter team name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">
                              Team Description
                            </label>
                            <textarea
                              name="teamDescription"
                              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                              rows="3"
                              placeholder="Describe your team and what you're looking for..."
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                  >
                    {joinType === 'individual' ? 'Submit Application' : 
                     joinType === 'join-team' ? 'Join Team' : 'Create Team'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}