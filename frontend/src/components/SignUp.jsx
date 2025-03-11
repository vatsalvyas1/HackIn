import { useState } from "react";


export default function SignUp(){
    const [state, setState] = useState({
        email: true,
        otp: false,
        profile: false
    });

    const [data,setData] = useState({
        email: "",
        otp: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const generateOtp = async(e) => {
        e.preventDefault();
        try{
            if(data.email === ""){
                throw new Error("Please enter email");
            }

            const response = await fetch("http://localhost:3000/api/v1/otp/send",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email
                })
            });

            if(!response.ok){
                throw new Error("Something went wrong");
            }
            setState({
                email: false,
                otp: true,
                profile: false
            });  
        } catch(err){
            console.log(err.message);
        }
    }

    const verifyOtp = async(e) => {
        e.preventDefault();
        try{
            if(data.otp === ""){
                throw new Error("Please enter otp");
            }

            const response = await fetch("http://localhost:3000/api/v1/otp/verify",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    otp: data.otp
                })
            });

            if(!response.ok){
                throw new Error("Something went wrong");
            }
            setState({
                email: false,
                otp: false,
                profile: true
            });  
        } catch(err){
            console.log(err.message);
        }
    }

    return(
        <>
            {state.email && (
            <form onSubmit={generateOtp} className="flex flex-col items-center space-y-4">
                <div>
                    <label htmlFor="email">Enter email Id</label>
                    <input type="text" name="email" id="email" placeholder="enter email" value={data.email}
                    onChange={handleChange} required
                    className="border m-2 px-2 rounded-full"/>
                </div>

                <button className="bg-yellow-400 p-2 px-4 font-semibold rounded-full hover:bg-yellow-500">GetOtp</button>
            </form>
            )}

            {state.otp && (
                <form onSubmit={verifyOtp} className="flex flex-col items-center space-y-4">
                <div>
                    <label htmlFor="otp">Enter OTP</label>
                    <input type="text" name="otp" id="otp" placeholder="enter otp"
                    onChange={handleChange} required
                    className="border m-2 px-2 rounded-full"/>
                </div>

                <button className="bg-yellow-400 p-2 px-4 font-semibold rounded-full hover:bg-yellow-500">Verify</button>
            </form>
            )}

            {state.profile && (
                <form onSubmit={""} className="flex flex-col items-center space-y-4">
                <div>
                    <label htmlFor="name">Enter Name</label>
                    <input type="text" name="name" id="name" placeholder="enter name"
                    className="border m-2 px-2 rounded-full"/>
                </div>

                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" placeholder="enter password"
                    className="border m-2 px-2 rounded-full"/>
                </div>

                <button className="bg-yellow-400 p-2 px-4 font-semibold rounded-full hover:bg-yellow-500">SignUp</button>
                </form>
            )}
        </>
    )
}