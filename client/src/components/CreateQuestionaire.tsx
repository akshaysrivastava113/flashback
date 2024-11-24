import { useState } from "react"
import minusSign from "../../public/minus.svg";
import plusSign from "../../public/plus.svg";
import crossSign from "../../public/cross.svg";
import doubleLeftArrow from "../../public/doubleLeftArrow.svg";
import rightLeftArrow from "../../public/doubleRightArrow.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import PublicErrorPage from "./PublicErrorPage";




export default function CreateQuestionaire(props: any){
    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a className="text-blue-400 cursor-pointer" href="/signin">sign in</a> to continue.</p></>);
    const signedIntoken: string = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;

    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const MIN_LIMIT = 1;
    const MAX_LIMIT = 10;
    const navigate = useNavigate();
    const [qTitle, setQTitle] = useState("");
    const [qTitleBlank, setQTitleBlank] = useState(false);
    const [noOfSlides, setNoOfSlides] = useState(1);
    const [ask, setAsk] = useState("");
    const [askBlank, setAskBlank] = useState(false);
    const [answer, setAnswer] = useState("");
    const [answerBlank, setAnswerBlank] = useState(false);
    interface slidesInter {
        id: number;
        ask: string;
        answer: string
    }
    const [slidesData, setSlidesData] = useState<any>([]);
    const [slidesDataBlank, setSlidesDataBlank] = useState(false);
    const [id, setId] = useState(1);
    const [loading, setLoading] = useState(false);

    return (
        signedInUser?
        <>
        <div className="flex flex-col justify-start items-center">
            <div id="questionaire-form" className="w-full lg:w-1/3 flex flex-col justify-center items-center mt-16 m-6 md:m-10 p-2 md:p-5 border border-gray-100 shadow-lg rounded-md">
            
                <div className="w-full flex flex-col justify-start m-5 p-5">
                    <label className="font-semibold m-2 p-2">Questionaire Title</label>
                    <input onChange={(e) => {
                        setQTitle(e.target.value);
                        setQTitleBlank(false);
                    }} className={`m-2 p-2 border border-gray-100 rounded-md ${qTitleBlank?'bg-red-100':'bg-white'}`} placeholder={`${qTitleBlank?'title cannot be blank':'title'}`} />
                </div>
            
           
        
            <div id="slides-grid-container" className={`w-full flex flex-wrap justify-center mt-18 m-5 p-5 rounded-xl ${slidesDataBlank?'bg-red-100':'bg-white'}`}>
                {slidesData.map((slide: any) => {
                    return (
                        <div id="slide-container" className="w-40 md:w-48 lg:w-56 h-40 md:h-48 lg:h-56 flex flex-col m-4 p-2 border border-gray-100 rounded-xl shadow-lg transition duration-100 ease-in-out transform hover:scale-110">
                            <div id="slide-header" className=" flex justify-between">
                                <p>{slide.id}</p>
                                <button id="del-btn" onClick={() => {
                                    setSlidesData((prevArray: any) => {
                                        //TODO: do it in one loop
                                        //remove the slide
                                        const newArray = prevArray.filter((item: any) => item.id !== slide.id);
                                        //sync up the ids post delete
                                        newArray.map((item: any) => {
                                            console.log(item.id);
                                            if(item.id>slide.id){
                                                item.id = item.id-1;
                                            }
                                        });
                                        setId(prevId => prevId-1);
                                        console.log(newArray);
                                        return newArray;
                                    })
                                    }}><img src={crossSign} className="w-8 h-8 p-1 transition duration-100 ease-in-out transform hover:scale-110"/></button>
                            </div>
                            <div id="slide-content" className="flex flex-col overflow-hidden">
                                <p className="text-xl break-words line-clamp-5">{slide.ask}</p>
                            </div>
                        </div>
                    )
                })}

                <div id="adder-container" className="w-full flex justify-evenly shadow-md rounded-xl m-4">
                    <div id="adder-inputs" className="w-full flex flex-col justify-center items-center">
                        {/* <label className="font-semibold">Slide {id}</label> */}
                        <input onChange={(e) => {
                            setAsk(e.target.value)
                            setAskBlank(false);
                        }} className={`w-full h-12 p-2 border border-gray-100 rounded-tl-xl ${askBlank?'bg-red-100':'bg-white'}`} placeholder={`${askBlank?'question cannot be blank':'question'}`}/>

                        <textarea rows={4} onChange={(e) => {
                            setAnswer(e.target.value);
                            setAnswerBlank(false);
                            }} className={`w-full p-2 border border-gray-100 rounded-bl-xl ${answerBlank?'bg-red-100':'bg-white'}`} placeholder={`${answerBlank?'answer cannot be blank':'answer'}`} />
                        
                    </div>
                    <div id="adder-btn" className="flex justify-center ">
                            <button onClick={() => {

                                setAskBlank(false);
                                setAnswerBlank(false);

                                if(ask === "") setAskBlank(true);
                                if(answer === "") setAnswerBlank(true);

                                if(ask !== "" && answer !==""){
                                    setId(prevId => prevId+1);
                                    const newItem = {
                                        id : id,
                                        ask: ask,
                                        answer: answer
                                    };
                                    setSlidesData((prevState: any) => [...prevState, newItem]);
                                    setSlidesDataBlank(false);
                                }

                            }} className="w-16 md:w-20 lg:w-24 bg-gradient-to-r from-red-200 to-pink-400  text-white font-bold shadow-lg relative overflow-hidden group rounded-tr-xl rounded-br-xl">
                            <span className="absolute top-0 left-0 w-full h-0 bg-white opacity-20 transition-all duration-300 group-hover:h-full"></span>
                            <span className="flex justify-center items-center"><img src={plusSign} className="w-8 h-8 cursor-pointer text-white "/></span>
                            </button> 
                        </div>
                    </div>

            </div>
            <div className="w-full flex justify-center mt-4 md:mt-8">
                <div className="flex justify-center">
                    <button className={`w-60 md:w-72 lg:w-80 min-h-12 border-2 border-gray-100 m-2 p-1 bg-red-400 text-white font-semibold rounded-xl hover:opacity-90 ${loading?'opacity-20':'opacity-100'}`} onClick={() => {

                        if(qTitle === "") setQTitleBlank(true);
                        if (slidesData.length === 0) setSlidesDataBlank(true);

                        if(qTitle !== "" && slidesData.length !== 0){
                            setLoading(true);
                            const finalObj = {
                                questTitle: qTitle,
                                slidesData: slidesData
                            };
                            
                            axios.post(`${backend_url}`+`/api/v1/create`, finalObj, {
                                headers: {
                                    "Authorization":`Bearer ${signedIntoken}`
                                }
                            })
                            .then((res) => {
                                console.log(res);
                                navigate('/');
                            })
                            .catch((err) => {
                                console.error(err);
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                        }

                    }} >{loading?<BeatLoader color="#FFFFFF" size={5} />:"Publish"}</button>
                </div>
            </div>
            </div>
        </div>
       
        </>
        :<PublicErrorPage text={errorText}/>
    )
}