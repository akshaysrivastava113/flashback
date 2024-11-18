import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const backend_url = process.env.REACT_APP_BACKEND_URL;
const expiryTime = 5/1440;
export default function Signup(){
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    function sendSignupReq() {
        console.log("Pressed");

        axios.post(`${backend_url}/auth/signup`, {
            "username": usernameInput,
            "email": emailInput,
            "password": passwordInput
        }).then(res => {
            const token = res.data.token;
            Cookies.set("fl-token", token, { expires: expiryTime});
            navigate('/');
        }).catch(err => {
            console.error(err);
        })

    }

    return (
        <div id="signup-form-container" className="flex justify-center items-start border-2 h-screen">
            <div id="signup-form" className=" flex flex-col justify-center mt-32 m-5 p-5">
                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Username </label>
                    <input onChange={(e) => setUsernameInput(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="johndoe123" />
                </div>
                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Email </label>
                    <input onChange={(e) => setEmailInput(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="john.doe@flashback.com" />
                </div>
                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Password </label>
                    <input onChange={(e) => setPasswordInput(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="********" />
                </div>
                <button onClick={() => sendSignupReq()}className="border-2 h-12 mt-8 m-2 p-2 bg-red-400 text-white font-semibold">Register</button>
            </div>
        </div>
    )
}