"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signup;
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_router_dom_1 = require("react-router-dom");
const react_spinners_1 = require("react-spinners");
const ErrorOccurred_1 = __importDefault(require("./ErrorOccurred"));
const SecondaryButton_1 = __importDefault(require("./SecondaryButton"));
const PublicErrorPage_1 = __importDefault(require("./PublicErrorPage"));
const backend_url = process.env.REACT_APP_BACKEND_URL;
const expiryTime = 30 / 1440;
function Signup() {
    const signedIntoken = js_cookie_1.default.get("fl-token");
    const [usernameInput, setUsernameInput] = (0, react_1.useState)("");
    const [isUsernameInputBlank, setIsUsernameInputBlank] = (0, react_1.useState)(false);
    const [emailInput, setEmailInput] = (0, react_1.useState)("");
    const [isEmailInputBlank, setIsEmailInputBlank] = (0, react_1.useState)(false);
    const [passwordInput, setPasswordInput] = (0, react_1.useState)("");
    const [isPasswordInputBlank, setIsPasswordInputBlank] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [errorOccurred, setErrorOccurred] = (0, react_1.useState)(false);
    const [errorText, setErrorText] = (0, react_1.useState)("Something went wrong! Please try again.");
    const navigate = (0, react_router_dom_1.useNavigate)();
    function sendSignupReq() {
        if (usernameInput === "") {
            setIsUsernameInputBlank(true);
        }
        if (emailInput === "") {
            setIsEmailInputBlank(true);
        }
        if (passwordInput === "") {
            setIsPasswordInputBlank(true);
        }
        if (usernameInput !== "" && emailInput !== "" && passwordInput !== "") {
            setLoading(true);
            axios_1.default.post(`${backend_url}/auth/signup`, {
                "username": usernameInput,
                "email": emailInput,
                "password": passwordInput
            }).then(res => {
                const token = res.data.token;
                js_cookie_1.default.set("fl-token", token, { expires: expiryTime });
                navigate('/');
            }).catch(err => {
                console.error(err);
                setErrorOccurred(true);
                if (err.status === 409)
                    setErrorText("Account already exists, please sign in to continue!");
                setTimeout(() => {
                    setErrorOccurred(false);
                }, 5000);
            }).finally(() => {
                setLoading(false);
            });
        }
    }
    return (!signedIntoken ?
        <div className="flex flex-wrap p-2 h-[90%]">
             <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl ">
                <img src="../../public/flash-logo-48.png" alt="home"/>
            </div>
            <div id="signup-form-container" className="w-full md:w-1/2 flex flex-col justify-center items-center mt-16 md:mt-24">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">Create a <span className="bg-gradient-to-br from-red-400 via-pink-400 to-zinc-600 bg-clip-text text-transparent">free account</span></h1>
                <div id="signup-form" className=" flex flex-col justify-center items-center m-2 md:m-5 p-2 md:p-5 shadow-lg border border-gray-100 rounded-md">
                    <ErrorOccurred_1.default errorOccurred={errorOccurred} text={errorText}/>
                    <div className="w-60 md:w-80 lg:w-96 flex flex-col justify-start mb-4">
                        <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Username </label>
                        <input onChange={(e) => {
                setUsernameInput(e.target.value);
                setIsUsernameInputBlank(false);
            }} className={`m-2 p-2 border-2 rounded-md ${isUsernameInputBlank ? 'bg-red-200' : 'bg-white'}`} placeholder="johndoe123"/>
                    </div>
                    <div className="w-60 md:w-80 lg:w-96 flex flex-col justify-start mb-4">
                        <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Email </label>
                        <input type="email" onChange={(e) => {
                setEmailInput(e.target.value);
                setIsEmailInputBlank(false);
            }} className={`m-2 p-2 border-2 rounded-md ${isEmailInputBlank ? 'bg-red-200' : 'bg-white'}`} placeholder="john.doe@flashback.com"/>
                    </div>
                    <div className="w-60 md:w-80 lg:w-96 flex flex-col justify-start mb-4">
                        <label className="mr-4 ml-4 mb-2 w-32 font-semibold">Password </label>
                        <input type="password" onChange={(e) => {
                setPasswordInput(e.target.value);
                setIsPasswordInputBlank(false);
            }} className={`m-2 p-2 border-2 rounded-md ${isPasswordInputBlank ? 'bg-red-200' : 'bg-white'}`} placeholder="********"/>
                    </div>
                    <SecondaryButton_1.default customTailwind="w-60 md:w-80 lg:w-96" execFunc={sendSignupReq} text={loading ? <react_spinners_1.BeatLoader color="#485AFF" size={5}/> : 'Sign up'}/>
                </div>
            </div>
        </div>
        :
            <PublicErrorPage_1.default text="Already signed in"/>);
}
