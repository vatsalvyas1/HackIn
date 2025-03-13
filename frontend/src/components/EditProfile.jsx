import { useState, useEffect } from 'react';
import { Plus, X } from "lucide-react";

export default function EditProfile() {
    const [user, setUser] = useState(null);
    const [addedSkills, setAddedSkills] = useState([]);
    const [skills, setSkills] = useState(["HTML", "CSS", "REACT", "JAVASCRIPT", "NEXT.JS"]);

    function addSkill(skill) {
        setAddedSkills((prevSkills) =>
            [...prevSkills, skill]
        );

        setSkills((prevSkills) => 
            prevSkills.filter((s) => s !== skill)
        );
    }

    function removeSkill(skill) {
        setAddedSkills((prevSkills) => 
            prevSkills.filter((s) => s !== skill)
        ); 

        setSkills((prevSkills) => 
            [...prevSkills,skill]
        )
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="mx-1 md:mx-16 px-4 text-white pt-8 pb-20">
            {user && (
                <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                    <div className="space-y-4 bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                        <img src={user.profileImage} alt="" className="h-16 w-16 rounded-full" />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>

                    <form action="" className="space-y-4 bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex-grow">
                        <div className="space-x-2">
                            <label htmlFor="bio">Bio : </label>
                            <input
                                type="text"
                                required
                                placeholder="Tell us about yourself"
                                className="flex-grow bg-neutral-800 border border-neutral-700 rounded-lg py-1 px-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-neutral-500"
                            />
                        </div>

                        <div className="space-x-2">
                            <label htmlFor="portfolio">Portfolio Link :</label>
                            <input
                                type="text"
                                placeholder="Portfolio link (if any)"
                                className="flex-grow bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-neutral-500"
                            />
                        </div>


                        {/*Skill */}
                        <div>
                            <h5>Add skills</h5>
                            {addedSkills.length > 0 && (
                                <ul className="flex gap-2 flex-wrap mt-2">
                                    {addedSkills.map((skill) => (
                                        <button
                                            key={skill}
                                            className="bg-purple-900/30 text-purple-400 border border-neutral-700 px-2 py-1 text-sm flex gap-2 items-center rounded-full font-mono hover:bg-purple-900/80 transition-color duration-300"
                                            onClick={() => removeSkill(skill)} // Remove skill on click
                                        >
                                            {skill} <X size={18} />
                                        </button>
                                    ))}
                                </ul>
                            )}

                            <ul className="flex gap-2 flex-wrap mt-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-neutral-900 border border-neutral-700 px-3 py-1 text-sm flex gap-2 items-center rounded-full font-mono cursor-pointer hover:bg-neutral-700 transition-color duration-300"
                                        onClick={() => addSkill(skill)} // Add skill on click
                                    >
                                        {skill} <Plus size={18} />
                                    </span>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
