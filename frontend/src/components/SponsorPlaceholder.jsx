import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

export default function SponsorPlaceholder() {
  return (
    <div className="">
      <div className="text-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-8 text-white overflow-hidden relative w-full">
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
          className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-4 inline-flex items-center gap-2"
        >
          Sponsor a Hackathon
        </Link>
        <div className="md:block absolute text-purple-200/20 font-medium -top-5 -left-10 text-xl md:text-5xl font-mono">
          <p>0101001</p>
          <p>10101001</p>
          <p>101010{"</>"}</p>
        </div>
        <div className="md:block absolute text-purple-200/20 font-medium -bottom-5 -right-10 text-xl md:text-5xl font-mono">
          <p>0101001</p>
          <p>10101001</p>
          <p>101010{"</>"}</p>
        </div>
      </div>
    </div>
  );
}
