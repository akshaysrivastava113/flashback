import { useState } from "react"
import minusSign from "../../public/minus.svg";
import plusSign from "../../public/plus.svg";
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
    const [noOfSlides, setNoOfSlides] = useState(1);
    const [ask, setAsk] = useState("");
    const [answer, setAnswer] = useState("");
    interface slidesInter {
        id: number;
        ask: string;
        answer: string
    }
    const [slidesData, setSlidesData] = useState<any>([]);
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);

    console.log(backend_url);
    console.log(signedIntoken);
    return (
        <div className="flex justify-center">
            <div id="questionaire-form" className="flex flex-col justify-center items-center mt-32 m-5 p-5 w-2/3">

                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Questionaire Title</label>
                    <input onChange={(e) => setQTitle(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="title" />
                </div>

     
                <div className="w-96 flex flex-col justify-start mb-4 mt-6">
                    <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Slide 1/<span>{noOfSlides}</span></label>
                    <input onChange={(e) => setAsk(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="question" />
                    <textarea onChange={(e) => setAnswer(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="answer" />
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
                        <span className="flex justify-center items-center">Add <img src={plusSign} className="ml-4 w-8 h-8 cursor-pointertext-white "/></span>
                        </button> 
                    
                    </div>
                </div>


                <div className="w-full flex flex-wrap justify-center mb-4 p-2 border-2">
                    {slidesData.map((slide: any) => {
                        return (
                        <div className="w-44 truncate flex flex-col justify-center m-2 p-2 border-2">
                            <p className="text-xl">{slide.ask}</p>
                            <p className="text-xl">{slide.answer}</p>
                            <button onClick={() => {
                                setSlidesData((prevArray: any) => {
                                    const newArray = prevArray.filter((item: any) => item.id !== slide.id);
                                    return newArray;
                                })
                            }}>Delete</button>
                        </div>
                        )
                    })}
               </div>

               <div className="w-96 flex flex-wrap justify-center">
                    <button className={`w-full border-2 m-2 p-1 bg-red-400 text-white font-semibold ${loading?'opacity-20':'opacity-100'}`} onClick={() => {
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
                        })
                    }} >{loading?<BeatLoader color="#FFFFFF" size={5} />:"Publish"}</button>
               </div>

            </div>
        </div>
    )
}