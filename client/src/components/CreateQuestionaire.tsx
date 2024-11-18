import { useState } from "react"
import minusSign from "../../public/minus.svg";
import plusSign from "../../public/plus.svg";
import doubleLeftArrow from "../../public/doubleLeftArrow.svg";
import rightLeftArrow from "../../public/doubleRightArrow.svg";

export default function CreateQuestionaire(props: any){
    const MIN_LIMIT = 1;
    const MAX_LIMIT = 10;
    const [qTitle, setQTitle] = useState("");
    const [noOfSlides, setNoOfSlides] = useState(1);
    const [ask, setAsk] = useState("");
    const [answer, setAnswer] = useState("");
    const [slidesData, setSlidesData] = useState([]);


    return (
        <div className="flex justify-center">
            <div id="questionaire-form" className="flex flex-col justify-center items-center mt-32 m-5 p-5 w-2/3">

                <div className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Questionaire Title</label>
                    <input onChange={(e) => setQTitle(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="john.doe@flashback.com" />
                </div>

                <div id="number-slides" className="w-96 flex flex-col justify-start mb-4">
                    <label className="mr-4 ml-4 mb-2 w-64 font-semibold">Choose number of slides</label>
                    <div id="number-controller" className="flex justify-start items-center m-2 p-2">
                        <img onClick={() => setNoOfSlides(noOfSlides => (noOfSlides > MIN_LIMIT ? noOfSlides-1 : noOfSlides))} src={minusSign} className="mr-4 w-8 h-8 cursor-pointer"/>
                        <p className="text-2xl">{noOfSlides}</p>
                        <img onClick={() => setNoOfSlides(noOfSlides => (noOfSlides < MAX_LIMIT ? noOfSlides+1 : noOfSlides))} src={plusSign} className="ml-4 w-8 h-8 cursor-pointer"/>
                    </div>
                </div>

                <div className="w-full flex justify-center flex-wrap mb-4 p-2">
                    {slidesData.map((slideData): any => {
                        return (
                            <div className="flex flex-col border-2 m-2 p-2">
                                <p>{slideData.ask}</p>
                                <p>{slideData.answer}</p>
                            </div>
                        )
                    })}
                </div>
                
                <div className="w-96 flex flex-col justify-start mb-4 mt-6">
                    <label className="mr-4 ml-4 mb-2 w-44 font-semibold">Slide 1/<span>{noOfSlides}</span></label>
                    <input onChange={(e) => setAsk(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="question" />
                    <textarea onChange={(e) => setAnswer(e.target.value)} className="m-2 p-2 border-2 rounded-md" placeholder="answer" />
                </div>

                <div className="w-96 flex justify-center mb-4 p-2">
                    <img onClick={() => {
                        setSlidesData((prevItems ): any => {
                            const newItems = [...prevItems];
                            if(newItems.length > 0) newItems.pop();
                            return newItems;
                        });
                    }} src={doubleLeftArrow} className="mr-4 w-12 h-12 p-2 cursor-pointer border-2 border-stone-300 rounded-md hover:bg-gray-200"/>
                    <img onClick={() => {
                        const newItem = {
                            ask: ask,
                            answer: answer
                        };
                        if(slidesData.length < noOfSlides)
                        setSlidesData((slidesData): any => [...slidesData, newItem]);
                    }} src={rightLeftArrow} className="ml-4 w-12 h-12 p-2 cursor-pointer border-2 border-stone-300 rounded-md hover:bg-gray-200"/>
                </div>

            </div>
        </div>
    )
}