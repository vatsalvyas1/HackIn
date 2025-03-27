import { useState } from "react";
import { backendUrl } from "../constanst";

export default function OnlineHackathonForm() {
    const [formState, setFormState] = useState("hackathon-details");
     const storedUser = JSON.parse(localStorage.getItem("user"));
     const [formData, setFormData] = useState({
       name: "",
       organizer: storedUser?._id || "",
       description: "",
       startDate: "",
       endDate: "",
       location: "",
       mode: "Online",
       prizePool: "",
       registrationDeadline: "",
       minTeamSize: "1",
       maxTeamSize: "1",
       website: "",
       collegeRepresenting: "",
       colorTheme: "",
       sponsorName: "",
       sponsorLogo: ""
     });
 
     const backendUrl = "http://localhost:3000";
 
     const colorTheme = {
         0 : "bg-gradient-to-r from-blue-900 to-purple-900",
         1 : "bg-gradient-to-r from-green-900 to-teal-900",
         2 : "bg-gradient-to-r from-red-900 to-orange-900",
         3 : "bg-gradient-to-r from-indigo-900 to-blue-900",
         4 : "bg-gradient-to-r from-purple-900 to-pink-900",
         5 : "bg-gradient-to-r from-yellow-900 to-amber-900"
     };
 
     const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData(prev => ({
           ...prev,
           [name]: value
         }));
     };
 
     const handleSubmit = async(e) => {
         e.preventDefault();
         try {
           const response = await fetch(`${backendUrl}/api/v1/hackathon/create-hackathon`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(formData)
           });
     
           if (!response.ok) {
             throw new Error("Something went wrong");
           }
         
           alert("Hackathon created successfully");
     
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
             website: "",
             collegeRepresenting: "",
             address: "",
             city: "",
             state: "",
             country: "",
             postalCode: "",
             colorTheme: "",
             sponsorName: "",
             sponsorLogo: ""
           });
         } catch (err) {
           console.log(err);
         }
     };
 
 
 
     return(
         <div className="flex flex-col items-center">
           <div className="w-full max-w-5xl">
             {/* <Link
               to={"/organise"}
               className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
             >
               <ArrowLeft className="w-4 h-4" /> Back to hackathon type
             </Link> */}
             <h1 className="text-4xl font-bold mb-8 text-center">
               Create your <span className="text-purple-500">Hackathon</span>
             </h1>
 
             <div className="max-w-5xl mx-auto mb-10">
               <div className="bg-neutral-800 rounded-lg p-1 flex flex-wrap">
                 <button 
                   className={`flex-1 py-3 px-4 rounded-md ${formState === "hackathon-details" ? "bg-purple-700 text-white" : "text-neutral-300 hover:text-white"} font-medium transition-colors duration-300`} 
                   onClick={() => setFormState("hackathon-details")}
                 >
                   Hackathon Details
                 </button>
                 <button 
                   className={`flex-1 py-3 px-4 rounded-md ${formState === "design" ? "bg-purple-700 text-white" : "text-neutral-300 hover:text-white"} font-medium transition-colors duration-300`} 
                   onClick={() => setFormState("design")}
                 >
                   Design and Sponsors
                 </button>
               </div>
             </div>
 
             {formState === "hackathon-details" && (
               <form onSubmit={handleSubmit} className="bg-neutral-800 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-neutral-700 shadow-xl space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2 md:col-span-2">
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
                   onClick={() => setFormState("design")}
                   className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform"
                 >
                   Next : Design and Sponsors
                 </button>
               </form>
             )}
 
             {formState === "design" && (
               <form className="bg-neutral-800 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-neutral-700 shadow-xl space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2 md:col-span-2">
                     <label htmlFor="colorTheme" className="block text-sm font-medium text-neutral-300">
                       Color Theme
                     </label>
                     <p className="w-full h-12 bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">{formData.colorTheme}</p>
 
                     <div>
                       <ul className="flex gap-2 mt-2">
                         {Object.keys(colorTheme).map((key) => (
                           <li key={key}>
                             <p
                               className={`w-10 h-10 rounded-lg ${colorTheme[key]}`}
                               onClick={() => setFormData((prev) => ({ ...prev, colorTheme: colorTheme[key] }))}
                             ></p>
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>

                   <div className="space-y-2 md:col-span-2">
                    <label htmlFor="collegeRepresenting" className="block text-sm font-medium text-neutral-300">College/Institution Name : </label>
                    <input 
                        type="text" 
                        id="collegeRepresenting" 
                        name="collegeRepresenting" 
                        value={formData.collegeRepresenting} 
                        onChange={handleChange} 
                        className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter college representing"
                    />
                   </div>
 
                   <div className="space-y-2 md:col-span-2">
                     <label htmlFor="sponsorName" className="block text-sm font-medium text-neutral-300">
                       Sponsor Name
                     </label>
                     <input
                       type="text"
                       id="sponsorName"
                       name="sponsorName"
                       value={formData.sponsorName}
                       onChange={handleChange}
                       className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                       placeholder="Enter sponsor name"
                     />
                   </div>
 
                   <div className="space-y-2 md:col-span-2">
                     <label htmlFor="sponsorLogo" className="block text-sm font-medium text-neutral-300">
                       Sponsor Logo URL
                     </label>
                     <input
                       type="url"
                       id="sponsorLogo"
                       name="sponsorLogo"
                       value={formData.sponsorLogo}
                       onChange={handleChange}
                       className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                       placeholder="https://..."
                     />
                   </div>
                 </div>
 
                 <button
                   onClick={handleSubmit}
                   className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform"
                 >
                   Create Hackathon
                 </button>
               </form>
             )}
           </div>
         </div>
     )
}