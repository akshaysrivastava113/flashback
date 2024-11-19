import { useState } from "react"
import minusSign from "../../public/minus.svg";
import plusSign from "../../public/plus.svg";
import doubleLeftArrow from "../../public/doubleLeftArrow.svg";
import rightLeftArrow from "../../public/doubleRightArrow.svg";
import axios from "axios";
import Cookies from "js-cookie";

const signedIntoken: string = Cookies.get("fl-token");

export default function CreateQuestionaire(props: any){
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    console.log(signedIntoken);
    const MIN_LIMIT = 1;
    const MAX_LIMIT = 10;
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

    return (
        <div className="flex justify-center">
            <div id="questionaire-form" className="flex flex-col justify-center items-center mt-32 m-5 p-5 w-2/3">

                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Questionaire Title</label>
                    <input onChange={(e) => setQTitle(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="john.doe@flashback.com" />
                </div>

                {/* <div id="number-slides" className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-64 font-semibold">Choose number of slides</label>
                    <div id="number-controller" className="flex justify-start items-center m-2 p-2">
                        <img onClick={() => setNoOfSlides(noOfSlides => (noOfSlides > MIN_LIMIT ? noOfSlides-1 : noOfSlides))} src={minusSign} className="mr-4 w-8 h-8 cursor-pointer"/>
                        <p className="text-2xl">{noOfSlides}</p>
                        
                    </div>
                </div> */}
     
                <div className="w-96 flex flex-col justify-start mb-4 mt-6">
                    <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Slide 1/<span>{noOfSlides}</span></label>
                    <input onChange={(e) => setAsk(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="question" />
                    <textarea onChange={(e) => setAnswer(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="answer" />
                    <img onClick={() => {
                        setId(prevId => prevId+1);
                        const newItem = {
                            id : id,
                            ask: ask,
                            answer: answer
                        };

                        setSlidesData((prevState: any) => [...prevState, newItem]);
                    }} src={plusSign} className="ml-4 w-8 h-8 cursor-pointer"/>
                </div>


                <div className="w-full flex flex-wrap justify-center mb-4 p-2 border-2">
                    {slidesData.map((slide: any) => {
                        return (
                        <div className="w-44 truncate flex flex-col justify-center m-2 p-2 border-2">
                            <p className="text-xl">{slide.ask}</p>
                            <p className="text-xl">{slide.answer}</p>
                            <button onClick={() => {
                                console.log(slide.id);
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
                    <button className=" w-full border-2 m-2 p-1 bg-red-400 text-white font-semibold" onClick={() => {
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
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                    }} >Submit</button>
               </div>

            </div>
        </div>
    )
}