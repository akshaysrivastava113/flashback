import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { RotateLoader } from 'react-spinners';
import doubleLeftArrow from '../../../public/doubleLeftArrow.svg';
import doubleRightArrow from '../../../public/doubleRightArrow.svg';
import PublicErrorPage from "../common/PublicErrorPage";
import FlipCard from "../display/FlipCard";

    type Params = Record<string, string | undefined>;

    const backend_url = process.env.REACT_APP_BACKEND_URL;
    
    interface Slides {
        id: string;
        ask: string;
        answer: string;
    }
    interface receivedQuestData {
        title: string,
        slides: string[]
    }
    let currentSlide = 0;
  
    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a className="text-blue-400 cursor-pointer" href="/signin">sign in</a> to continue.</p></>);
  
export default function SlidesDisplay() {

    const { questIdParam } = useParams<Params>();
    const signedIntoken: string | any = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    const [currentAsk, setCurrentAsk] = useState("");
    const [currentAns, setCurrentAns] = useState("");
    const [totalSlides, setTotalSlides] = useState(0);

    const [loading, setLoading] = useState(true);
    const [leftArrowStyle, setLeftArrowStyle] = useState("opacity-100");
    const [rightArrowStyle, setRightArrowStyle] = useState("opacity-100");

    const [slidesState, setSlidesState] = useState<Slides[]>();
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        currentSlide = 0;
        axios.get<receivedQuestData>(`${backend_url}/quest/${questIdParam}`, {
            headers: {
                 "Authorization":`Bearer ${signedIntoken}`
            }
        }).then((allSlides: any) => {
            console.log("allSlides", allSlides);
            setSlidesState(allSlides.data.slides);
            setTotalSlides(allSlides.data.slides.length);
            setLoading(false);
            setCurrentAsk(allSlides.data.slides[currentSlide].ask);
            setCurrentAns(allSlides.data.slides[currentSlide].answer);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })

    },[])

    useEffect(() => {
        if(currentSlide>0){
            setLeftArrowStyle("opacity-100");
        } else {
            setLeftArrowStyle("opacity-20");
        }
        if(!totalSlides || currentSlide<totalSlides-1){
            setRightArrowStyle("opacity-100"); 
        } else {
            setRightArrowStyle("opacity-20");
        }
    }, [currentSlide]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
      };
    

    if(loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <RotateLoader color="#485AFF" loading={loading} />
            </div>
        )
    }

    return (
        signedInUser?
        <div id="slides-display" className="flex flex-col justify-center items-center mt-16">
            <div className="flex justify-center items-center w-full">

                <div onClick={() => {
                    if(currentSlide>0){
                        setIsFlipped(false);
                        setTimeout(() => {
                            currentSlide -= 1;
                            setCurrentAsk(slidesState&&slidesState[currentSlide].ask || "");
                            setCurrentAns(slidesState&&slidesState[currentSlide].answer || "");
                        }, 200);
                    }
                }}  className={`flex flex-col justify-center items-center ${leftArrowStyle}`}>
                    <img src={doubleLeftArrow}  className="w-8 h-8 cursor-pointer"/>
                </div>

                <FlipCard isFlipped={isFlipped} handleFlip={handleFlip} ask={currentAsk} answer={currentAns}/> 
                {/* <div id="qna-conrainer" className="flex flex-col justify-center items-center border-2 rounded-md w-1/3 h-96 mb-4">
                    <p className="m-2 p-2 font-bold">{currentAsk}</p>
                    {displayAns&&<p className="m-2 p-2 border-t-2 ">{currentAns}</p>} 
                </div> */}

                <div onClick={() => {
                    if(currentSlide < totalSlides-1){
                        setIsFlipped(false);
                        setTimeout(() => {
                            currentSlide += 1;
                            setCurrentAsk(slidesState&&slidesState[currentSlide].ask || "");
                            setCurrentAns(slidesState&&slidesState[currentSlide].answer || "");
                        }, 200);

                    }
                }} className={`flex flex-col justify-center items-center ${rightArrowStyle}`}>
                    <img src={doubleRightArrow}  className="w-8 h-8 cursor-pointer"/>
                </div>
            </div>
        </div>
        :<PublicErrorPage text={errorText} />
    )
}