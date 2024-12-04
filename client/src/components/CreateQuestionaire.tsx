import { useRef, useState } from "react"
import crossSign from "../../public/cross.svg";
import axios from "axios";
import Cookies from "js-cookie";
import plusSign from "../../public/plus.svg";
import chatBubbleSign from "../../public/chatBubble.svg";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import PublicErrorPage from "./PublicErrorPage";
import Adder from "./Adder";
import PrimaryButton from "./PrimaryButton";


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
    const [pos, setPos] = useState(1);
    const [loading, setLoading] = useState(false);
    const [adderModal, setAdderModal] = useState(false);
    const modalRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (event: any) => {
    //         if(adderModal && modalRef.current && !modalRef.current.contains(event.target)){
    //             setAdderModal(false);
    //         }
    //     } 
    //     if(adderModal){
    //         document.addEventListener("mousedown", handleClickOutside);
    //     }

    //     // Cleanup event listener
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };

    // }, [adderModal]);

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
            .then((res: any) => {
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
            
                <div className="w-full grid grid-cols-3 grid-rows-2 m-5 p-5">

                    <div className="flex justify-start items-center col-span-2">
                        <label className="font-semibold m-2 p-2">Questionaire Title</label>
                    </div>

                    <div className="flex justify-end items-center col-span-1">
                        <PrimaryButton customTailwind="p-2" execFunc={publishQuest} tailIcon={chatBubbleSign} text={loading?<BeatLoader color="#485aff" size={5} />:'Publish' } /> 
                    </div>

                    <div className="flex justify-start items-center col-span-2">
                        <input onChange={(e) => {
                            setQTitle(e.target.value);
                            setQTitleBlank(false);
                            }} className={`m-2 p-2 w-full border border-gray-100 rounded-md ${qTitleBlank?'bg-red-100':'bg-white'}`} placeholder={`${qTitleBlank?'title cannot be blank':'title'}`} />
                    </div>
                    <div className="flex justify-end items-center col-span-1">
                        <label className="font-semibold m-2 p-2"></label>
                    </div>
                </div>

            <div className="w-full flex flex-col items-start justify-center m-5 p-5">
                <label className="font-semibold m-2 p-2">Add Slides</label>
                <button className="m-2 p-2" onClick={() => {
                    setAdderModal(true);
                }}><img src={plusSign} className="w-8 h-8 cursor-pointer text-white"/></button>
            </div>

           
            <div id="slides-grid-container" className={`w-full flex flex-wrap justify-center mt-18 m-5 p-5 rounded-xl ${slidesDataBlank?'bg-red-100':'bg-white'}`}>
                {slidesData.map((slide: any) => {
                    return (
                        <div id="slide-container" className="w-40 md:w-48 lg:w-56 h-40 md:h-48 lg:h-56 flex flex-col m-4 p-2 border border-gray-100 rounded-xl shadow-lg transition duration-100 ease-in-out transform hover:scale-110">
                            <div id="slide-header" className=" flex justify-between">
                                <p>{slide.pos}</p>
                                <button id="del-btn" onClick={() => {
                                    setSlidesData((prevArray: any) => {
                                        //TODO: do it in one loop
                                        //remove the slide
                                        const newArray = prevArray.filter((item: any) => item.pos !== slide.pos);
                                        //sync up the ids post delete
                                        newArray.map((item: any) => {
                                            console.log(item.pos);
                                            if(item.pos>slide.pos){
                                                item.pos = item.pos-1;
                                            }
                                        });
                                        setPos(prevPos => prevPos-1);
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

            {adderModal&&<Adder modalRef={modalRef} pos={pos} setPos={setPos} setSlidesData={setSlidesData} setSlidesDataBlank={setSlidesDataBlank} setAdderModal={setAdderModal}/>}
            </div>
        </div>
       
        </>
        :<PublicErrorPage text={errorText}/>
    )
}