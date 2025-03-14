import { logout } from "../firebase";
import { useState ,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Pencil } from "lucide-react";

export default function DashBoard(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    },[]);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        localStorage.removeItem("user");

        navigate("/");
        window.location.reload();
    };

    return (
        <div className="mx-1 md:mx-16 pt-8 px-4 text-white pb-20">
            {user ? (
                <div className="border border-neutral-700 bg-neutral-800 rounded-md">
                    <div className="bg-neutral-900 border-b border-neutral-700 p-4 flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <img src={user.profileImage} alt="profile" className="w-10 h-10 md:w-16 md:h-16 rounded-full"/>
                            <div>
                                <h3 className="md:text-xl">{user.name}</h3>
                                <p className="text-sm md:text-base text-neutral-400">{user.bio}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <span className="bg-purple-900/30 text-purple-400 px-3 py-1 text-sm md:text-base rounded-full font-medium mr-2">
                                {user.contributionScore} 🏆
                            </span>

                            <Link to="/edit-profile" className="bg-purple-600 hover:bg-purple-500 hover:-translate-y-1 px-3 py-1 rounded-md transition-all duration-300 mr-2 flex items-center gap-1">
                                <Pencil size={18} />
                            </Link>

                            <button onClick={handleLogout} className="bg-purple-600 hover:bg-purple-500 hover:-translate-y-1 px-2 py-1 rounded-md transition-all duration-300">
                                <LogOut size={18}/>
                            </button>
                        </div>
                    </div>

                    <p className="p-4">hii</p>
                </div>
            ) : (
                <div>
                    Log In first
                </div>
            )}

        </div>
    )
}