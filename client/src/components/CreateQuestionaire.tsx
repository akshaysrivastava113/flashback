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

const signedIntoken: string = Cookies.get("fl-token");

export default function CreateQuestionaire(props: any){
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
        <>
        <div className="flex flex-col justify-start items-center ml-10">
            <div id="questionaire-form" className="w-1/3 flex flex-col justify-center items-center mt-20 m-5 p-5">
            
                <div className="w-full flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Questionaire Title</label>
                    <input onChange={(e) => {
                        setQTitle(e.target.value);
                        setQTitleBlank(false);
                    }} className={`m-2 p-2 border-2 rounded-md ${qTitleBlank?'bg-red-100':'bg-white'}`} placeholder={`${qTitleBlank?'title cannot be blank':'title'}`} />
                </div>
            
            
            {/* <div className="w-full flex flex-col justify-start mb-4 mt-6">
                <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Slide {id}</label>
                <input onChange={(e) => setAsk(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="question" />
                <textarea rows={4} onChange={(e) => setAnswer(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="answer" />
                <div className="flex justify-center mt-4">
                    <button onClick={() => {
                        setId(prevId => prevId+1);
                        const newItem = {
                            id : id,
                            ask: ask,
                            answer: answer
                        };
                        setSlidesData((prevState: any) => [...prevState, newItem]);
                    }} className="px-6 py-2 bg-gradient-to-r from-indigo-300 to-purple-300 text-white font-bold rounded-lg shadow-lg relative overflow-hidden group transition-transform transform hover:scale-105">
                    <span className="absolute top-0 left-0 w-full h-0 bg-white opacity-20 transition-all duration-300 group-hover:h-full"></span>
                    <span className="flex justify-center items-center">Add <img src={plusSign} className="ml-4 w-8 h-8 cursor-pointer text-white "/></span>
                    </button> 
                </div>
            </div> */}
            
            </div>
        
            <div id="slides-grid-container" className={`w-2/3 flex flex-wrap justify-center mt-18 m-5 p-5 rounded-xl ${slidesDataBlank?'bg-red-100':'bg-white'}`}>
                {slidesData.map((slide: any) => {
                    return (
                        <div id="slide-container" className="w-44 h-50 flex flex-col m-2 p-2 border-2 transition duration-100 ease-in-out transform hover:scale-110">
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

                <div id="adder-container" className="flex w-96 m-5 h-full justify-evenly border-1 rounded-lg">
                    <div id="adder-inputs" className="w-3/4 flex flex-col justify-center items-center">
                        {/* <label className="font-semibold">Slide {id}</label> */}
                        <input onChange={(e) => {
                            setAsk(e.target.value)
                            setAskBlank(false);
                        }} className={`w-full border-2 h-12 p-2  ${askBlank?'bg-red-100':'bg-white'}`} placeholder={`${askBlank?'question cannot be blank':'question'}`}/>

                        <textarea rows={4} onChange={(e) => {
                            setAnswer(e.target.value);
                            setAnswerBlank(false);
                            }} className={`w-full border-2 p-2 ${answerBlank?'bg-red-100':'bg-white'}`} placeholder={`${answerBlank?'answer cannot be blank':'answer'}`} />
                        
                    </div>
                    <div id="adder-btn" className="w-1/4 flex justify-center ">
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

                            }} className=" w-full bg-gradient-to-r from-indigo-300 to-purple-300 text-white font-bold shadow-lg relative overflow-hidden group transition-transform transform hover:scale-105">
                            <span className="absolute top-0 left-0 w-full h-0 bg-white opacity-20 transition-all duration-300 group-hover:h-full"></span>
                            <span className="flex justify-center items-center"><img src={plusSign} className="w-8 h-8 cursor-pointer text-white "/></span>
                            </button> 
                        </div>
                    </div>

            </div>
            <div className="w-full flex justify-center mt-20">
                <div className="w-2/3 flex justify-end">
                    <button className={`w-64 border-2  p-1 bg-red-400 text-white font-semibold ${loading?'opacity-20':'opacity-100'}`} onClick={() => {

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
       
        </>
    )
}