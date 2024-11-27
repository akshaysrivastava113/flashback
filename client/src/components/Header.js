"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const react_router_dom_1 = require("react-router-dom");
const PrimaryButton_1 = __importDefault(require("./PrimaryButton"));
const SecondaryButton_1 = __importDefault(require("./SecondaryButton"));
const ProfileIcon_1 = __importDefault(require("./ProfileIcon"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const singout_svg_1 = __importDefault(require("../../public/singout.svg"));
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const backend_url = process.env.REACT_APP_BACKEND_URL;
function Header() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const signedIntoken = js_cookie_1.default.get("fl-token");
    const signedInUser = js_cookie_1.default.get("fl-token") ? true : false;
    const [username, setUsername] = (0, react_1.useState)("");
    const [userEmail, setUserEmail] = (0, react_1.useState)("");
    const [badges, setBadges] = (0, react_1.useState)("");
    const [profileSelectedd, setProfileSelectedd] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (signedInUser) {
            axios_1.default.get(`${backend_url}/user/dets`, {
                headers: {
                    "Authorization": `Bearer ${signedIntoken}`
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
            });
        }
    }, [signedInUser]);
    return (<>
        <div id="header" className="w-full bg-white border-b flex justify-between items-center h-12 md:h-16 lg:h-20">
            

            <div id="header-left" className="m-2 ml-14 md:ml-16 w-6 lg:w-10">
                <a onClick={() => navigate('/')} className=" cursor-pointer flex justify-center items-center">
                    <img src="../../public/flash-logo-48.png" alt="home"/>
                <span className="bg-gradient-to-br from-black via-black-400 to-zinc-600 bg-clip-text text-transparent font-bold ml-2 text-lg">flashback</span></a>
            </div>
            

            <div id="header-right" className="flex justify-center items-center mr-2 md:mr-6 lg:mr-10 ">
                {!signedInUser ?
            <>
                <SecondaryButton_1.default text="Sign Up" navigateTo="/signup"/>
                <PrimaryButton_1.default text="Sign In" navigateTo="/signin"/>
                </>
            :
                <>
                <SecondaryButton_1.default text="Create" navigateTo="/create"/>
                <ProfileIcon_1.default profileSelectedd={profileSelectedd} setProfileSelectedd={setProfileSelectedd}/>
                </>}
                
            </div>

        </div>
            {profileSelectedd &&
            <div id="backlayer" className="w-full h-full absolute flex justify-end" onClick={() => setProfileSelectedd(false)}>
                    <div id="profile-window" className=" border-2 bg-white w-fit h-fit rounded-md flex flex-col justify-start items-start m-2 p-1 z-50">
                        <div>
                            <p className=" font-bold py-0 px-1 text-lg">{username}</p>
                            <p className="py-0 px-1 text-md">{userEmail}</p>
                            <p className="p-1 text-md text-gray-500">{badges}</p>
                        </div>
                        <div onClick={() => navigate('/profile')} className="w-full cursor-pointer hover:bg-gray-200">
                        <p className="p-1 text-md">Profile</p>
                        </div>
                        <div className="cursor-pointer w-full" onClick={() => {
                    js_cookie_1.default.remove('fl-token');
                    navigate('/');
                    window.location.reload();
                }}>
                            {/* <img  src={signout} className="ml-4 w-8 h-8 cursor-pointer"/> */}
                            <p className="flex justify-center items-center p-1 hover:bg-gray-200 rounded-lg">Sign Out <img src={singout_svg_1.default} className="m-2 w-8 h-8 cursor-pointer"/></p>
                        </div>
                    </div>
                </div>}
        </>);
}
