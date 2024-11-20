import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import PublicErrorPage from "./PublicErrorPage";

const backend_url = process.env.REACT_APP_BACKEND_URL;
const expiryTime = 30/1440;
const signedIntoken: string = Cookies.get("fl-token");

export default function Signin(){
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function sendSignupReq() {
        setLoading(true);
        axios.post(`${backend_url}/auth/signin`, {
            "email": emailInput,
            "password": passwordInput
        }).then(res => {
            const token = res.data.token;
            Cookies.set("fl-token", token, { expires: expiryTime});
            navigate('/');
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })

    }

    return (
        !signedIntoken?<div id="signup-form-container" className="flex justify-center items-start border-2 h-screen">
            <div id="signup-form" className=" flex flex-col justify-center mt-32 m-5 p-5">
                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Email </label>
                    <input type="email" onChange={(e) => setEmailInput(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="john.doe@flashback.com" />
                </div>
                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Password </label>
                    <input type="password" onChange={(e) => setPasswordInput(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="********" />
                </div>
                <button onClick={() => sendSignupReq()} className={`border-2 h-12 mt-8 m-2 p-2 bg-red-400 text-white font-semibold ${loading?'opacity-20':'opacity-100'}`}>{loading?<BeatLoader color="#FFFFFF" size={5} />:'Sign in'}</button>
            </div>
        </div>:<PublicErrorPage text="Already signed in"/>
    )
}