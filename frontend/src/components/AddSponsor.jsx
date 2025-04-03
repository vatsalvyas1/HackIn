import { useState } from "react";
import { Mail, Globe, Image } from "lucide-react";
import { backendUrl } from "../constanst.js";

export default function AddSponsor() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    logo: "",
    contactEmail: "",
    tier: "Bronze"
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser)._id;

    if (!userId) {
        console.error("User ID is missing");
        return;
      }

    try {
      const response = await fetch(
        `${backendUrl}/api/v1/sponsors`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 ">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-mono">
          Become a <span className="text-purple-500">Sponsor</span>
        </h3>
        <p className="text-neutral-400">
          Support the next generation of innovators and showcase your brand
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        method="post"
        className="bg-neutral-800 rounded-xl p-6 border border-neutral-700"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-400 mb-1"
          >
            Organization Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            placeholder="Enter your organization name"
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-400 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            placeholder="Tell us about your organization and why you want to sponsor..."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-5 w-5 text-neutral-500" />
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://your-website.com"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Logo URL
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-2.5 h-5 w-5 text-neutral-500" />
              <input
                type="url"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://your-logo-url.com/logo.png"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Contact Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-500" />
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="contact@your-org.com"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="tier"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Sponsorship Tier
            </label>
            <select
              id="tier"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Submit Sponsorship Request
          </button>
        </div>
      </form>
    </div>
  );
}