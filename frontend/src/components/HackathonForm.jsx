import { useState } from "react";
import { MapPin, Globe, Blend, ArrowLeft } from "lucide-react";
import OfflineHackathonForm from "./OfflineHackathonForm";
import OnlineHackathonForm from "./OnlineHackathonForm";

function HackathonForm() {
  const [slide, setSlide] = useState("hackathon-type");
  const [mode, setHackathonMode] = useState("");

  const handleChange = (e) => {
    setHackathonMode(e.target.value);
  }

  const setMode = () => {
    if (mode === "Offline") {
      setSlide("offline-hackathon");
    } else if (mode === "Online") {
      setSlide("online-hackathon");
    } else if (mode === "Hybrid") {
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
              className={`${mode === "Offline" ? "bg-purple-900/30 border-purple-800 text-purple-400" : "bg-neutral-900 border-neutral-700"} border p-4 rounded-lg cursor-pointer transition-all duration-300 w-full hover:-translate-y-1`}
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
              className={`${mode === "Online" ? "bg-purple-900/30 border-purple-800 text-purple-400" : "bg-neutral-900 border-neutral-700"} border p-4 rounded-lg cursor-pointer transition-all duration-300 w-full hover:-translate-y-1`}
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
              className={`${mode === "Hybrid" ? "bg-purple-900/30 border-purple-800 text-purple-400" : "bg-neutral-900 border-neutral-700"} border p-4 rounded-lg cursor-pointer transition-all duration-300 w-full hover:-translate-y-1`}
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
        <OfflineHackathonForm />
      )}

      {slide === "online-hackathon" && (
        <OnlineHackathonForm />
      )}
    </div>
  );
}

export default HackathonForm;