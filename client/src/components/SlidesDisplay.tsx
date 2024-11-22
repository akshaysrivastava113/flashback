import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { RotateLoader } from 'react-spinners';
import doubleLeftArrow from '../../public/doubleLeftArrow.svg';
import doubleRightArrow from '../../public/doubleRightArrow.svg';
import PublicErrorPage from "./PublicErrorPage";

interface Params {
    questIdParam: string; // Define the expected parameters
  }

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  let currentSlide = 0;
  
export default function SlidesDisplay() {

    const { questIdParam } = useParams<Params>();
    const signedIntoken: string = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    const [currentAsk, setCurrentAsk] = useState("");
    const [currentAns, setCurrentAns] = useState("");
    const [totalSlides, setTotalSlides] = useState(0);

    const [loading, setLoading] = useState(true);
    const [leftArrowStyle, setLeftArrowStyle] = useState("opacity-100");
    const [rightArrowStyle, setRightArrowStyle] = useState("opacity-100");

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

    interface Slides {
        id: string;
        ask: string;
        answer: string;
    }

    const [slidesState, setSlidesState] = useState<Slides[]>();
    const [displayAns, setDisplayAns] = useState(false);
    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a href="/signin">sign in</a> to continue.</p></>);
    
        useEffect(() => {
            currentSlide = 0;
            axios.get<Slides[]>(`${backend_url}/quest/${questIdParam}`, {
                headers: {
                     "Authorization":`Bearer ${signedIntoken}`
                }
            }).then((allSlides) => {

                setSlidesState(allSlides.data);
                setTotalSlides(allSlides.data.length);
                setLoading(false);
                setCurrentAsk(allSlides.data[currentSlide].ask);
                setCurrentAns(allSlides.data[currentSlide].answer);
            }).catch((err) => {

                setLoading(false);
            })

        },[])

    if(loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <RotateLoader color="#F87171" loading={loading} />
            </div>
        )
    }

    return (
        
        <div id="home" className="flex flex-col justify-center items-center mt-44">
            {signedInUser?
            <>
            <div className="flex justify-center items-center w-full">

                <div onClick={() => {
                    if(currentSlide>0){
                        currentSlide -= 1;
                        setCurrentAsk(slidesState&&slidesState[currentSlide].ask || "");
                        setCurrentAns(slidesState&&slidesState[currentSlide].answer || "");
                        setDisplayAns(false);
                    }
                }}  className={`flex flex-col justify-center items-center mr-12 ${leftArrowStyle}`}>
                    <img src={doubleLeftArrow}  className="w-8 h-8 cursor-pointer"/>
                </div>

                <div id="qna-conrainer" className="flex flex-col justify-center items-center border-2 rounded-md w-1/3 h-96 mb-4">
                    <p className="m-2 p-2 font-bold">{currentAsk}</p>
                    {displayAns&&<p className="m-2 p-2 border-t-2 ">{currentAns}</p>} 
                </div>

                <div onClick={() => {
                    if(currentSlide < totalSlides-1){
                        currentSlide += 1;
                        setCurrentAsk(slidesState&&slidesState[currentSlide].ask || "");
                        setCurrentAns(slidesState&&slidesState[currentSlide].answer || "");
                        setDisplayAns(false);

                    }
                }} className={`flex flex-col justify-center items-center ml-12 ${rightArrowStyle}`}>
                    <img src={doubleRightArrow}  className="w-8 h-8 cursor-pointer"/>
                </div>
            </div>
            <div className="">
                <button onClick={() => {
                    setDisplayAns(true);
                }} className="px-6 py-3 bg-gradient-to-r from-indigo-300 to-purple-300 text-white font-bold rounded-lg shadow-lg relative overflow-hidden group transition-transform transform hover:scale-105">
                <span className="absolute top-0 left-0 w-full h-0 bg-white opacity-20 transition-all duration-300 group-hover:h-full"></span>
                <span className="relative z-10">Reveal</span>
                </button> 
            </div>
            </>
          :<PublicErrorPage text={errorText} />}
        </div>
    )
}