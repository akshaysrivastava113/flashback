import { useNavigate } from "react-router-dom"
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import ProfileIcon from "./ProfileIcon";
import Cookies from "js-cookie";
import signout from "../../public/singout.svg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function Header() {
    const navigate = useNavigate();
    const signedIntoken: string | any = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [badges, setBadges] = useState("");
    const [profileSelectedd, setProfileSelectedd] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(signedInUser){
            axios.get(`${backend_url}/user/dets`, {
                headers: {
                    "Authorization":`Bearer ${signedIntoken}`
               }
            })
            .then((res) => {
                console.log("ran");
                console.log(res);
                setUsername(res.data.username);
                setUserEmail(res.data.email);
                setBadges(res.data.badges);
            })
            .catch((err) => {
                console.error(err);
            })
        }
    }, [signedInUser]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            
            if(profileSelectedd && profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileSelectedd(false);
            }
        }
        
        if(profileSelectedd){
            document.addEventListener("mousedown", handleClickOutside);
        }

            return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [profileSelectedd])
    return (
        <>
        <div id="header" className="w-full bg-white border-b flex justify-between items-center h-12 md:h-16 lg:h-20">
            

            <div id="header-left" className="m-2 ml-14 md:ml-16 w-6 lg:w-10">
                <a onClick={() => navigate('/')} className=" cursor-pointer flex justify-center items-center">
                    <img src="./flash-logo-48.png" alt="home"/>
                <span className="bg-gradient-to-br from-black via-black-400 to-zinc-600 bg-clip-text text-transparent font-bold ml-2 text-lg">flashback</span></a>
            </div>
            

            <div id="header-right" className="flex justify-center items-center mr-2 md:mr-6 lg:mr-10 ">
                {!signedInUser?
                <>
                <SecondaryButton text="Sign Up" navigateTo="/signup"/>
                <PrimaryButton text="Sign In" navigateTo="/signin"/>
                </>
                :
                <>
                <SecondaryButton text="Create" navigateTo="/create"/>
                <ProfileIcon profileSelectedd={profileSelectedd} setProfileSelectedd={setProfileSelectedd}/>
                </>
                }
                
            </div>

        </div>
            {profileSelectedd&&
               
                    <div ref={profileRef} id="profile-window" className="absolute right-2 top-14 border-2 bg-white w-fit h-fit rounded-md flex flex-col justify-start items-start m-2 p-1 z-10">
                        <div>
                            <p className="font-bold py-0 px-1 text-lg">{username}</p>
                            <p className="py-0 px-1 text-md">{userEmail}</p>
                            <p className="p-1 text-md text-gray-500">{badges}</p>
                        </div>
                        <div onClick={() => navigate('/profile')} className="w-full cursor-pointer hover:bg-gray-200">
                        <p  className="p-1 text-md">Profile</p>
                        </div>
                        <div className="cursor-pointer w-full" onClick={() => {
                                    Cookies.remove('fl-token');
                                    navigate('/');
                                    window.location.reload();
                                }}>
                            {/* <img  src={signout} className="ml-4 w-8 h-8 cursor-pointer"/> */}
                            <p className="flex justify-center items-center p-1 hover:bg-gray-200 rounded-lg">Sign Out <img src={signout} className="m-2 w-8 h-8 cursor-pointer"/></p>
                        </div>
                    </div>
                
            }
        </>
    )
}