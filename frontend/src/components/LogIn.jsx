import { useState } from "react";


export default function LogIn(){
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

    const generateOtp = (e) => {
        e.preventDefault();
        setState({
            email: false,
            otp: true,
            profile: false
        });
        window.alert("OTP has been sent to your email " + data.email);   
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
                <form onSubmit={""} className="flex flex-col items-center space-y-4">
                <div>
                    <label htmlFor="otp">Enter OTP</label>
                    <input type="text" name="otp" id="otp" placeholder="enter otp"
                    className="border m-2 px-2 rounded-full"/>
                </div>

                <button className="bg-yellow-400 p-2 px-4 font-semibold rounded-full hover:bg-">Verify</button>
            </form>
            )}
        </>
    )
}