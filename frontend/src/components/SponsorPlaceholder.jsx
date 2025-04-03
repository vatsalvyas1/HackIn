import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

export default function SponsorPlaceholder() {
  return (
    <div className="text-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-8 text-white overflow-hidden relative">
      <h1 className="text-3xl md:text-4xl mb-4 font-bold font-mono">
        Join us as a <span className="text-purple-500">Sponsor</span>
      </h1>

      <p className="text-neutral-300 max-w-3xl mx-auto mb-8">
        Support the next generation of innovators and put your brand in front of
        thousands of talented developers. Join other industry leaders on{" "}
        <span className="text-purple-500 font-bold">HackIn</span> and connect
        with the brightest minds in tech through hackathon sponsorships,
        mentorship opportunities, and exclusive recruiting access.
      </p>
      <Link
        to="/add-sponsor"
        className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-8 inline-flex items-center gap-2"
      >
        <Rocket size={20} />
        Sponsor a Hackathon
      </Link>
      <div className="md:block rotate-20 absolute text-purple-200/20 font-medium top-15 right-[-10%] text-xl md:text-5xl font-mono">
        <p>{"</>"}$$$$$$$$$</p>
        <p>$$$$$$$$$$$</p>
        <p>$$$$$$$$$$$</p>
      </div>
    </div>
  );
}
