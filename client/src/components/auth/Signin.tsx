import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import PublicErrorPage from "../common/PublicErrorPage";
import ErrorOccurred from "../common/ErrorOccurred";
import PrimaryButton from "../common/PrimaryButton";

const backend_url = process.env.REACT_APP_BACKEND_URL;
const expiryTime = 30/1440;


export default function Signin(){
    const signedIntoken: string | any = Cookies.get("fl-token");
    const [emailInput, setEmailInput] = useState("");
    const [isEmailInputBlank, setIsEmailInputBlank] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [isPasswordInputBlank, setPasswordInputBlank] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState(false);
    
    const navigate = useNavigate();

    function sendSigninReq() {
        if(emailInput === ""){
            setIsEmailInputBlank(true);
        }
        if(passwordInput === ""){
            setPasswordInputBlank(true);
        }
        if(emailInput !== "" && passwordInput !== ""){
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
                setErrorOccurred(true);
                setTimeout(() => {
                    setErrorOccurred(false);
                }, 5000)
            }).finally(() => {
                setLoading(false);
            })
        }

    }

    return (
        !signedIntoken?
        <div className="flex flex-wrap p-2 h-[90%]">
            <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl ">
                <img src="./flash-logo-48.png" alt="home"/>
            </div>
            <div id="signin-form-container" className="w-full md:w-1/2 flex flex-col justify-center items-center mt-16 md:mt-24 ">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">Sign in to <span className="bg-gradient-to-br from-red-400 via-pink-400 to-zinc-600 bg-clip-text text-transparent">flashback</span></h1>
                <div id="signin-form" className="flex flex-col justify-center items-center m-2 md:m-5 p-2 md:p-5 shadow-lg border border-gray-100 rounded-md">
                    <ErrorOccurred errorOccurred={errorOccurred} text="Something went wrong! Please try again."/>
                    <div className=" none w-60 md:w-80 lg:w-96 flex flex-col justify-start mb-4">
                        <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Email *</label>
                        <input type="email" onChange={(e) => {
                            setEmailInput(e.target.value);
                            setIsEmailInputBlank(false);
                        }} className={`m-2 p-2 border-2 rounded-md ${isEmailInputBlank?'bg-red-200':'bg-white'}`} placeholder="john.doe@flashback.com" />
                    </div>
                    <div className="w-60 md:w-80 lg:w-96  flex flex-col justify-start mb-4">
                        <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Password *</label>
                        <input type="password" onChange={(e) => {
                            setPasswordInputBlank(false);
                            setPasswordInput(e.target.value);
                        }} className={`m-2 p-2 border-2 rounded-md ${isPasswordInputBlank?'bg-red-200':'bg-white'}`} placeholder="********" />
                    </div>
                    <PrimaryButton customTailwind="w-60 md:w-80 lg:w-96" execFunc={sendSigninReq} text={loading?<BeatLoader color="#FFFFFF" size={5} />:'Sign in'} /> 
                </div>
            </div>
        </div>:
        <PublicErrorPage text="Already signed in"/>
        
    )
}