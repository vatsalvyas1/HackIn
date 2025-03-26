import { useState } from "react";
import { MapPin, Globe, Blend, ArrowLeft } from "lucide-react";
import { backendUrl } from "../constanst.js";

function HackathonForm() {
  const [slide, setSlide] = useState("hackathon-type");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    name: "",
    organizer: storedUser?._id || "", // Initialize with the user ID if available
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    mode: "",
    prizePool: "",
    registrationDeadline: "",
    minTeamSize: "1",
    maxTeamSize: "1",
    website: ""
  });
  const backendUrl = "http://localhost:3000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try{
        const response = await fetch(`${backendUrl}/api/v1/hackathon/create-hackathon`,{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({
                ...formData
            })
        });

        if(!response.ok){
            throw new Error("something went wrong");
        }

        setFormData({
            name: "",
            organizer: "",
            description: "",
            startDate: "",
            endDate: "",
            location: "",
            mode: "",
            prizePool: "",
            registrationDeadline: "",
            minTeamSize: "1",
            maxTeamSize: "1",
            website: ""
        });
    } catch (err) {
        console.log(err);
    }
  };

  const setMode = () => {
    if (formData.mode === "Offline") {
      setSlide("offline-hackathon");
    } else if (formData.mode === "Online") {
      setSlide("online-hackathon");
    } else if (formData.mode === "Hybrid") {
      setSlide("hybrid-hackathon");
    }
  };

  return (
    <div className="mx-1 md:mx-16 px-4 pt-8 pb-16 text-white">
      {slide === "hackathon-type" && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl mb-4 font-bold font-mono text-center">
            Select <span className="text-purple-500">Hackathon Type</span>
          </h1>
          <form className="bg-neutral-800 flex flex-col gap-4 justify-center items-center p-4 md:p-8 border border-neutral-700 rounded-xl">
            <input
              type="radio"
              name="mode"
              id="Offline"
              value="Offline"
              className="hidden"
              onChange={handleChange}
            />
            <label
              htmlFor="Offline"
              className={`${formData.mode === "Offline" ? "bg-purple-900/30 border-purple-800 text-purple-400" : "bg-neutral-900 border-neutral-700"} border p-4 rounded-lg cursor-pointer transition-all duration-300 w-full hover:-translate-y-1`}
            >
              <div className="flex gap-2 items-center">
                <MapPin />
                <h3 className="text-2xl font-bold">Offline</h3>
              </div>
              <p className="text-neutral-400">For regular on-site hackathons</p>
            </label>

            <input
              type="radio"
              name="mode"
              id="Online"
              value="Online"
              className="hidden"
              onChange={handleChange}
            />
            <label
              htmlFor="Online"
              className={`${formData.mode === "Online" ? "bg-purple-900/30 border-purple-800 text-purple-400" : "bg-neutral-900 border-neutral-700"} border p-4 rounded-lg cursor-pointer transition-all duration-300 w-full hover:-translate-y-1`}
            >
              <div className="flex gap-2 items-center">
                <Globe />
                <h3 className="text-2xl font-bold">Online</h3>
              </div>
              <p className="text-neutral-400">For beginner-friendly hackathons where anyone can apply and make their submission during the hackathon duration directly</p>
            </label>

            <input
              type="radio"
              name="mode"
              id="Hybrid"
              value="Hybrid"
              className="hidden"
              onChange={handleChange}
            />
            <label
              htmlFor="Hybrid"
              className={`${formData.mode === "Hybrid" ? "bg-purple-900/30 border-purple-800 text-purple-400" : "bg-neutral-900 border-neutral-700"} border p-4 rounded-lg cursor-pointer transition-all duration-300 w-full hover:-translate-y-1`}
            >
              <div className="flex gap-2 items-center">
                <Blend />
                <h3 className="text-2xl font-bold">Hybrid</h3>
              </div>
              <p className="text-neutral-400">For online hackathons where organizers have control over the quality of hackers by screening their applications</p>
            </label>

            <button
              className="bg-purple-700 hover:bg-purple-600 font-bold w-full py-3 rounded-xl transition-color duration-300"
              onClick={() => setMode()}
            >
              Continue
            </button>
          </form>
        </div>
      )}

      {slide === "offline-hackathon" && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <button
              onClick={() => setSlide("hackathon-type")}
              className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to hackathon type
            </button>
            <h1 className="text-4xl font-bold mb-8 text-center">
              Create your <span className="text-purple-500">Hackathon</span>
            </h1>
            <form onSubmit={handleSubmit} className="bg-neutral-800 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-neutral-700 shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                    Hackathon Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter hackathon name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-300">
                    Venue Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter venue location"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-300">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your hackathon"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="minTeamSize" className="block text-sm font-medium text-neutral-300">
                    Min Team Size
                  </label>
                  <input
                    type="number"
                    id="minTeamSize"
                    name="minTeamSize"
                    value={formData.minTeamSize}
                    onChange={handleChange}
                    min="1"
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="maxTeamSize" className="block text-sm font-medium text-neutral-300">
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    id="maxTeamSize"
                    name="maxTeamSize"
                    value={formData.maxTeamSize}
                    onChange={handleChange}
                    min="1"
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="prizePool" className="block text-sm font-medium text-neutral-300">
                    Prize Pool
                  </label>
                  <input
                    type="number"
                    id="prizePool"
                    name="prizePool"
                    value={formData.prizePool}
                    onChange={handleChange}
                    min="0"
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter prize pool amount"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-medium text-neutral-300">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="startDate" className="block text-sm font-medium text-neutral-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="endDate" className="block text-sm font-medium text-neutral-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="registrationDeadline" className="block text-sm font-medium text-neutral-300">
                    Registration Deadline
                  </label>
                  <input
                    type="date"
                    id="registrationDeadline"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform"
              >
                Create Hackathon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HackathonForm;