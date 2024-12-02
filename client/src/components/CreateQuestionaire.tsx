import { useState } from "react"
import crossSign from "../../public/cross.svg";
import axios from "axios";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import PublicErrorPage from "./PublicErrorPage";
import SecondaryButton from "./SecondaryButton";
import Adder from "./Adder";


export default function CreateQuestionaire(){
    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a className="text-blue-400 cursor-pointer" href="/signin">sign in</a> to continue.</p></>);
    const signedIntoken: string | any = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;

    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [qTitle, setQTitle] = useState("");
    const [qTitleBlank, setQTitleBlank] = useState(false);
    const [slidesData, setSlidesData] = useState<any>([]);
    const [slidesDataBlank, setSlidesDataBlank] = useState(false);
    const [id, setId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [adderModal, setAdderModal] = useState(false);
    const publishQuest = ()=> {

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

    }
    return (
        signedInUser?
        <>
        <div className="flex flex-col justify-start items-center">
            <div id="questionaire-form" className="w-full lg:w-2/3 h-full flex flex-col justify-center items-center p-2 md:p-5 border-l border-r border-b border-gray-200">
            
                <div className="w-full flex justify-center items-center">
                    <div className="w-2/3 flex flex-col justify-start m-5 p-5">
                        <label className="font-semibold m-2 p-2">Questionaire Title</label>
                        <input onChange={(e) => {
                            setQTitle(e.target.value);
                            setQTitleBlank(false);
                        }} className={`m-2 p-2 border border-gray-100 rounded-md ${qTitleBlank?'bg-red-100':'bg-white'}`} placeholder={`${qTitleBlank?'title cannot be blank':'title'}`} />
                    </div>
                    <div className="w-1/3 flex justify-center items-center">
                        <div className="flex justify-center">
                            <SecondaryButton customTailwind="w-40 md:w-48 lg:w-60 h-10 md:h-14 lg:h-16" execFunc={publishQuest} text={loading?<BeatLoader color="#485aff" size={5} />:'Publish'} /> 
                        </div>
                    </div>
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
            </div>

            <button onClick={() => {
                setAdderModal(true);
            }}>Add Slide</button>
            {adderModal?<Adder setId={setId} setSlidesData={setSlidesData} setSlidesDataBlank={setSlidesDataBlank} id={id} setAdderModal={setAdderModal}/>:''}
            </div>
        </div>
       
        </>
        :<PublicErrorPage text={errorText}/>
    )
}