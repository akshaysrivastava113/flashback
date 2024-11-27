"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SlidesDisplay;
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_spinners_1 = require("react-spinners");
const doubleLeftArrow_svg_1 = __importDefault(require("../../public/doubleLeftArrow.svg"));
const doubleRightArrow_svg_1 = __importDefault(require("../../public/doubleRightArrow.svg"));
const PublicErrorPage_1 = __importDefault(require("./PublicErrorPage"));
const FlipCard_1 = __importDefault(require("./FlipCard"));
const backend_url = process.env.REACT_APP_BACKEND_URL;
let currentSlide = 0;
const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a className="text-blue-400 cursor-pointer" href="/signin">sign in</a> to continue.</p></>);
function SlidesDisplay() {
    const { questIdParam } = (0, react_router_dom_1.useParams)();
    const signedIntoken = js_cookie_1.default.get("fl-token");
    const signedInUser = js_cookie_1.default.get("fl-token") ? true : false;
    const [currentAsk, setCurrentAsk] = (0, react_1.useState)("");
    const [currentAns, setCurrentAns] = (0, react_1.useState)("");
    const [totalSlides, setTotalSlides] = (0, react_1.useState)(0);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [leftArrowStyle, setLeftArrowStyle] = (0, react_1.useState)("opacity-100");
    const [rightArrowStyle, setRightArrowStyle] = (0, react_1.useState)("opacity-100");
    const [slidesState, setSlidesState] = (0, react_1.useState)();
    const [displayAns, setDisplayAns] = (0, react_1.useState)(false);
    const [isFlipped, setIsFlipped] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        console.log("ran signedIntoken", signedIntoken);
        currentSlide = 0;
        axios_1.default.get(`${backend_url}/quest/${questIdParam}`, {
            headers: {
                "Authorization": `Bearer ${signedIntoken}`
            }
        }).then((allSlides) => {
            console.log(allSlides);
            setSlidesState(allSlides.data);
            setTotalSlides(allSlides.data.length);
            setLoading(false);
            setCurrentAsk(allSlides.data[currentSlide].ask);
            setCurrentAns(allSlides.data[currentSlide].answer);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        }).finally(() => {
            console.log("ran");
            setLoading(false);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (currentSlide > 0) {
            setLeftArrowStyle("opacity-100");
        }
        else {
            setLeftArrowStyle("opacity-20");
        }
        if (!totalSlides || currentSlide < totalSlides - 1) {
            setRightArrowStyle("opacity-100");
        }
        else {
            setRightArrowStyle("opacity-20");
        }
    }, [currentSlide]);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    if (loading) {
        console.log(loading);
        return (<div className="h-screen flex justify-center items-center">
                <react_spinners_1.RotateLoader color="#485AFF" loading={loading}/>
            </div>);
    }
    return (signedInUser ?
        <div id="slides-display" className="flex flex-col justify-center items-center mt-16">
            <div className="flex justify-center items-center w-full">

                <div onClick={() => {
                if (currentSlide > 0) {
                    setIsFlipped(false);
                    setTimeout(() => {
                        currentSlide -= 1;
                        setCurrentAsk(slidesState && slidesState[currentSlide].ask || "");
                        setCurrentAns(slidesState && slidesState[currentSlide].answer || "");
                    }, 200);
                }
            }} className={`flex flex-col justify-center items-center ${leftArrowStyle}`}>
                    <img src={doubleLeftArrow_svg_1.default} className="w-8 h-8 cursor-pointer"/>
                </div>

                <FlipCard_1.default isFlipped={isFlipped} handleFlip={handleFlip} ask={currentAsk} answer={currentAns}/> 
                {/* <div id="qna-conrainer" className="flex flex-col justify-center items-center border-2 rounded-md w-1/3 h-96 mb-4">
                <p className="m-2 p-2 font-bold">{currentAsk}</p>
                {displayAns&&<p className="m-2 p-2 border-t-2 ">{currentAns}</p>}
            </div> */}

                <div onClick={() => {
                if (currentSlide < totalSlides - 1) {
                    setIsFlipped(false);
                    setTimeout(() => {
                        currentSlide += 1;
                        setCurrentAsk(slidesState && slidesState[currentSlide].ask || "");
                        setCurrentAns(slidesState && slidesState[currentSlide].answer || "");
                    }, 200);
                }
            }} className={`flex flex-col justify-center items-center ${rightArrowStyle}`}>
                    <img src={doubleRightArrow_svg_1.default} className="w-8 h-8 cursor-pointer"/>
                </div>
            </div>
        </div>
        : <PublicErrorPage_1.default text={errorText}/>);
}
