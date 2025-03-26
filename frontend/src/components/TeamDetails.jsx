import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Users, Info, MessageSquare, MessageCircleMore, Loader2, Check, X, Trophy, MapPin } from 'lucide-react';
// import { backendUrl } from "../constanst";
import { io } from "socket.io-client";

const backendUrl = "http://localhost:3000";

export default function TeamDetails() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);

        const newSocket = io(backendUrl, {
            withCredentials: true,
        });
        setSocket(newSocket);

        const fetchTeamData = async () => {
            try {
                setLoading(true);
    
                // Fetch team details
                const teamResponse = await fetch(`${backendUrl}/api/v1/team/get-team/${teamId}`);
                if (!teamResponse.ok) {
                    throw new Error("Failed to fetch team data");
                }
                const teamData = await teamResponse.json();
                setTeam(teamData.data);
    
                // Join the team room in socket
                newSocket.emit("join_team", teamId);
    
                if (!storedUser || !storedUser._id) {
                    throw new Error("User not found in localStorage");
                }
    
                // Fetch messages with userId in POST request
                const messagesResponse = await fetch(`${backendUrl}/api/v1/message/${teamId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: storedUser._id }),
                });
    
                if (!messagesResponse.ok) {
                    throw new Error("Failed to fetch messages");
                }
    
                const messagesData = await messagesResponse.json();
                setMessages(messagesData.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTeamData();

        //socket listener
        newSocket.on("new_message", (message) => {
            setMessages(prev => [...prev, message]);
        });
        return () => {
            newSocket.off("new_message");
            newSocket.disconnect();
        };
    }, [teamId]);

    useEffect(() => {
        // scroll to bottom jab bhi new message aaye
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            teamId,
            senderId: user._id,
            senderName: user.username,
            content: newMessage,
        };
        socket.emit("send_message", messageData);
        setNewMessage('');
    };

    const acceptRequest = async (teamId, userId) => {
        try {
            const response = await fetch(`${backendUrl}/api/v1/team/accept-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ teamId, userId }),
            });

            if(!response.ok) {
                throw new Error("something went wrong");
            }

             // notification when user join team
             if (socket) {
                socket.emit("user_joined", {
                    teamId,
                    userName: userId.name 
                });
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const rejectRequest = async (teamId, userId) => {
        try {
            const response = await fetch(`${backendUrl}api/v1/team/reject-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ teamId, userId }),
            });

            if(!response.ok) {
                throw new Error("something went wrong");
            }

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="mx-1 md:mx-16 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
            {team && (
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl overflow-hidden">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-10" />
                        <div className="relative bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-700 p-6 sm:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="h-20 w-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl font-bold text-3xl flex items-center justify-center shadow-lg text-white">
                                    {team.teamName.split(" ").map((item) => item[0]).join('')}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-white mb-2">{team.teamName}</h1>
                                    <div className="flex items-center gap-3 text-neutral-400">
                                        <MapPin className="w-4 h-4" />
                                        <span>{team.location}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                        <span>{team.hackathonName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-white">
                                <span className="text-md font-bold bg-purple-600/20 px-4 py-2 rounded-full border border-purple-600/50 text-purple-300">
                                    {team.teamScore} 🏆
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900 px-6 py-3 border-b border-neutral-700 flex overflow-x-auto">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                                activeTab === 'overview' 
                                    ? 'text-white border-b-2 border-purple-600' 
                                    : 'text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700'
                            }`}
                        >
                            <Info className="w-4 h-4" />
                            Overview
                        </button>

                        <button 
                            onClick={() => setActiveTab('chat')}
                            className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                                activeTab === 'chat' 
                                ? 'text-white border-b-2 border-purple-600' 
                                : 'text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700'
                            }`}
                        >
                            <MessageCircleMore className="w-4 h-4" />
                            Chat
                        </button>
                        
                        <button 
                            onClick={() => setActiveTab('members')}
                            className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                                activeTab === 'members' 
                                ? 'text-white border-b-2 border-purple-600' 
                                : 'text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Team Members
                        </button>

                        {user._id === team.teamLeader && (
                            <button 
                                onClick={() => setActiveTab('requests')}
                                className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                                    activeTab === 'requests' 
                                        ? 'text-white border-b-2 border-purple-600' 
                                        : 'text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700'
                                    }`}
                            >
                                <MessageSquare className="w-4 h-4" />
                                Requests
                                {team.joinRequests.length > 0 && (
                                    <span className="ml-2 px-2 py-0.5 font-bold text-xs bg-purple-600 text-white rounded-full">
                                        {team.joinRequests.length > 9 ? '9+' : team.joinRequests.length}
                                    </span>
                                )}
                            </button>
                            )}
                    </div>

                    <div className="p-6 sm:p-8">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-3">About</h2>
                                    <p className="text-neutral-300 leading-relaxed">{team.description}</p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-white mb-3">Skills Required</h2>
                                    <div className="flex gap-2 flex-wrap">
                                        {team.skills.map((skill, index) => (
                                            <span 
                                                key={index}
                                                className="bg-purple-900/40 text-purple-300 border border-purple-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-900/60 transition-colors duration-300 font-mono"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

{activeTab === "chat" && (
                            <div>
                                <h2 className="text-xl font-bold text-white mb-6">Team Chat</h2>
                                <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700 h-96 overflow-y-auto flex flex-col gap-4">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-md p-2 max-w-2/3 ${
                                                message.senderId === user._id
                                                    ? "text-purple-400 bg-purple-900/30 self-end"
                                                    : message.type === "notification"
                                                    ? "text-yellow-400 bg-yellow-900/20 self-center text-sm italic"
                                                    : "text-white bg-neutral-800 self-start"
                                            }`}
                                        >
                                            {message.type === "notification" ? (
                                                message.content
                                            ) : (
                                                <>
                                                    <div className="font-bold text-xs mb-1">
                                                        {message.senderName}
                                                    </div>
                                                    <div>{message.content}</div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                                <form onSubmit={handleSendMessage} className="flex gap-4 mt-4">
                                    <input 
                                        type="text" 
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="bg-neutral-900 border border-neutral-700 w-full h-10 rounded-full px-3 text-white"
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-purple-700 text-white font-bold p-4 py-2 rounded-full"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'members' && (
                            <div>
                                <h2 className="text-xl font-bold text-white mb-6">Team Members</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {team.teamMembers.map((member, index) => (
                                       <div
                                       key={index}
                                       onClick={() => navigate("/dashboard", { state: { userId: member._id } })} // Pass userId as state
                                       className="group bg-neutral-900 rounded-lg p-4 border border-neutral-700 hover:border-purple-600 transition-all duration-300 text-center cursor-pointer"
                                     >
                                            <img 
                                                src={member.profileImage} 
                                                alt="" 
                                                className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-neutral-700 group-hover:border-purple-600 transition-colors duration-300"
                                            />
                                            <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                            <span className="text-neutral-400 text-sm">{member.email}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'requests' && (
                            <div>
                                <h2 className="text-xl font-bold text-white mb-6">Join Requests</h2>
                                <div className="space-y-4">
                                    {team.joinRequests.length > 0 ? (
                                        team.joinRequests.map((request, index) => (
                                            <div 
                                                key={index} 
                                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 rounded-lg p-4 border border-neutral-700"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img 
                                                        src={request.userId.profileImage} 
                                                        alt="" 
                                                        className="w-12 h-12 rounded-full border-2 border-neutral-700"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">{request.userId.name}</h3>
                                                        <span className="text-neutral-400 text-sm">{request.userId.email}</span>
                                                    </div>
                                                </div>
                                                <p className="text-neutral-300 bg-neutral-800 rounded-md px-4 py-2">{request.message}</p>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => acceptRequest(team._id, request.userId._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                        Accept
                                                    </button>
                                                    <button 
                                                        onClick={() => rejectRequest(team._id, request.userId._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-300"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-neutral-400">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg">No pending requests</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}