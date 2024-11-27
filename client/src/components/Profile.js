"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Profile;
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const QuestionaireDisplay_1 = __importDefault(require("./QuestionaireDisplay"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const a_cartoony_textless_science_trivia_youtube_thumbnail_jpeg_1 = __importDefault(require("../../public/a_cartoony_textless_science_trivia_youtube_thumbnail.jpeg"));
const cartoony_textless_maths_trivia_youtube_thumbnail_jpeg_1 = __importDefault(require("../../public/cartoony_textless_maths_trivia_youtube_thumbnail.jpeg"));
const cartoony_textless_history_trivia_youtube_thumbnail_with_jpeg_1 = __importDefault(require("../../public/cartoony_textless_history_trivia_youtube_thumbnail_with.jpeg"));
const PublicErrorPage_1 = __importDefault(require("./PublicErrorPage"));
const react_spinners_1 = require("react-spinners");
const react_router_dom_1 = require("react-router-dom");
function Profile(props) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const signedIntoken = js_cookie_1.default.get("fl-token");
    const signedInUser = js_cookie_1.default.get("fl-token") ? true : false;
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const [questionaires, setQuestionaires] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    let bgImageUrl;
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            setLoading(true);
            try {
                const allQuestionaires = yield axios_1.default.get(`${backend_url}/user/profile`, {
                    headers: {
                        "Authorization": `Bearer ${signedIntoken}`
                    }
                });
                setQuestionaires(allQuestionaires.data);
                setLoading(false);
            }
            catch (e) {
                console.error(e);
                setLoading(false);
            }
        });
        if (signedInUser) {
            fetchData();
        }
    }, []);
    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a className="text-blue-400 cursor-pointer" href="/signin">sign in</a> to continue.</p></>);
    if (loading) {
        return (<div className="h-screen flex justify-center items-center">
                <react_spinners_1.RotateLoader color="#485AFF" loading={loading}/>
            </div>);
    }
    return (signedInUser ?
        <div id="profile" className={`flex flex-col flex-wrap h-screen ${signedInUser ? 'justify-start' : 'justify-center'}`}>
            <div id="my-quests-title" className="m-2 p-2">
                <h2 className="text-xl font-bold">My Questionaires</h2>
            </div>
        
            <div id="my-quests" className="flex justify-start flex-wrap">

                {questionaires.length > 0 ? questionaires.map((questItem) => {
                if (questItem.title === "Science") {
                    bgImageUrl = a_cartoony_textless_science_trivia_youtube_thumbnail_jpeg_1.default;
                }
                else if (questItem.title === "Maths") {
                    bgImageUrl = cartoony_textless_maths_trivia_youtube_thumbnail_jpeg_1.default;
                }
                else if (questItem.title === "History") {
                    bgImageUrl = cartoony_textless_history_trivia_youtube_thumbnail_with_jpeg_1.default;
                }
                else {
                    bgImageUrl = cartoony_textless_history_trivia_youtube_thumbnail_with_jpeg_1.default;
                }
                return (<QuestionaireDisplay_1.default bgImage={bgImageUrl} key={questItem.id} id={questItem.id} title={questItem.title}/>);
            }) : <h5 className="m-2 p-2">No Questionaires found. Create some <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/create')}>here</span></h5>} 

            </div>
        </div>
        : <PublicErrorPage_1.default text={errorText}/>);
}
