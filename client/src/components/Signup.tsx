import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import ErrorOccurred from "./ErrorOccurred";

const backend_url = process.env.REACT_APP_BACKEND_URL;
const expiryTime = 30/1440;
export default function Signup(){
    const [usernameInput, setUsernameInput] = useState("");
    const [isUsernameInputBlank, setIsUsernameInputBlank] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [isEmailInputBlank, setIsEmailInputBlank] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [isPasswordInputBlank, setIsPasswordInputBlank] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [errorText, setErrorText] = useState("Something went wrong! Please try again.");
    const navigate = useNavigate();

    function sendSignupReq() {
        if(usernameInput === ""){
            setIsUsernameInputBlank(true);
        }
        if(emailInput === ""){
            setIsEmailInputBlank(true);
        }
        if(passwordInput === ""){
            setIsPasswordInputBlank(true);
        }

        if(usernameInput !== "" && emailInput !== "" && passwordInput !== ""){
            setLoading(true);
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
                setErrorOccurred(true);
                if(err.status === 409)
                    setErrorText("Account already exists, please sign in to continue!")
                setTimeout(() => {
                    setErrorOccurred(false);
                }, 5000);
            }).finally(() => {
                setLoading(false);
            })
        }

    }

    return (
        <div id="signup-form-container" className="flex flex-col justify-center items-center mt-16 md:mt-24">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">Create a <span className="bg-gradient-to-br from-red-400 via-pink-400 to-zinc-600 bg-clip-text text-transparent">free account</span></h1>
            <div id="signup-form" className=" flex flex-col justify-center items-center m-2 md:m-5 p-2 md:p-5 shadow-lg border border-gray-100 rounded-md">
                <ErrorOccurred errorOccurred={errorOccurred} text={errorText}/>
                <div className="w-60 md:w-80 lg:w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Username </label>
                    <input onChange={(e) => {
                        setUsernameInput(e.target.value);
                        setIsUsernameInputBlank(false);
                    }} className={`m-2 p-2 border-2 rounded-md ${isUsernameInputBlank?'bg-red-200':'bg-white'}`} placeholder="johndoe123" />
                </div>
                <div className="w-60 md:w-80 lg:w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Email </label>
                    <input type="email" onChange={(e) => {
                        setEmailInput(e.target.value);
                        setIsEmailInputBlank(false);
                    }} className={`m-2 p-2 border-2 rounded-md ${isEmailInputBlank?'bg-red-200':'bg-white'}`} placeholder="john.doe@flashback.com" />
                </div>
                <div className="w-60 md:w-80 lg:w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Password </label>
                    <input type="password" onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setIsPasswordInputBlank(false);
                    }} className={`m-2 p-2 border-2 rounded-md ${isPasswordInputBlank?'bg-red-200':'bg-white'}`} placeholder="********" />
                </div>
                <button onClick={() => sendSignupReq()} className={`w-60 md:w-80 lg:w-96 min-h-12 border-2 border-red-400 m-2 p-1 bg-white text-red-400 font-semibold rounded-xl hover:opacity-90 ${loading?'opacity-20 hover:opacity-20 ':'opacity-100 hover:opacity-90'}`}>{loading?<BeatLoader color="red" size={5} />:'Sign up'}</button>
            </div>
        </div>
    )
}