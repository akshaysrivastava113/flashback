import { useNavigate } from "react-router-dom"
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Cookies from "js-cookie";
import logoMain from "../../public/logo.svg";


export default function Header() {
    const navigate = useNavigate();
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    console.log(signedInUser);
    return (
        <div id="header" className="w-full bg-red-400 flex justify-between items-center h-16">


            <div id="header-left" className="m-2 ml-16 w-10">
                <a onClick={() => navigate('/')} className=" cursor-pointer flex justify-center items-center"><img src="../../public/logo.svg" alt="home"/>
                <p className="ml-2 font-mono">flashback</p></a>
            </div>
            

            <div id="header-right" className="cursor-pointer flex justify-center items-center mr-4">
                {!signedInUser?
                <>
                <SecondaryButton text="Register" navigateTo="/signup"/>
                <PrimaryButton text="Sign In" navigateTo="/signin"/>
                </>
                :
                <>
                <PrimaryButton text="Create" navigateTo="/create"/>
                <div onClick={() => navigate('/profile')} className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                </>
                }
                
            </div>

        </div>
    )
}