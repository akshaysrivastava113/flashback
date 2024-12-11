import axios from "axios"
import { useEffect, useState } from "react"
import QuestionaireDisplay from "../common/QuestionaireDisplay";
import Cookies from "js-cookie";
import bgImage1 from '../../../public/a_cartoony_textless_science_trivia_youtube_thumbnail.jpeg';
import bgImage2 from '../../../public/cartoony_textless_maths_trivia_youtube_thumbnail.jpeg';
import bgImage3 from '../../../public/cartoony_textless_history_trivia_youtube_thumbnail_with.jpeg';
import PublicErrorPage from "../common/PublicErrorPage";
import { RotateLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";

interface Quest {
    id: string;
    title: string;
    authorId: string;
}

export default function Profile(){
    const navigate = useNavigate();
    const signedIntoken: string | any = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const [questionaires, setQuestionaires] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
    const [delModal, setDelModal] = useState(false);
    let bgImageUrl: string;

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const allQuestionaires = await axios.get<Quest[]>(`${backend_url}/user/profile`, {
                    headers: {
                        "Authorization":`Bearer ${signedIntoken}`
                    }
                })
    
                setQuestionaires(allQuestionaires.data);
                setLoading(false);
            }catch(e){
                console.error(e);
                setLoading(false);
            }
        }

        if(signedInUser){
            fetchData();
        }
            
    },[]);

    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a className="text-blue-400 cursor-pointer" href="/signin">sign in</a> to continue.</p></>);

    if(loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <RotateLoader color="#485AFF" loading={loading} />
            </div>
        )
    }


    return (
        signedInUser?
        <div id="profile" className={`flex flex-col flex-wrap h-screen ${signedInUser?'justify-start':'justify-center'}`}>
            <div id="my-quests-title" className="m-2 p-2">
                <h2 className="text-xl font-bold">My Questionaires</h2>
            </div>
        
            <div id="my-quests" className="flex justify-start flex-wrap">

                {questionaires.length>0?questionaires.map((questItem) => {
                    if(questItem.title === "Science"){
                        bgImageUrl = bgImage1;
                    } else if(questItem.title === "Maths"){
                        bgImageUrl = bgImage2;
                    } else if (questItem.title === "History"){
                        bgImageUrl = bgImage3;
                    } else {
                        bgImageUrl = bgImage3;
                    }
                    return (

                        <QuestionaireDisplay bgImage={bgImageUrl} key={questItem.id} id={questItem.id} title={questItem.title} editBtn={true} delBtn={true} setDelModal={setDelModal} />
                    )
                }):<h5 className="m-2 p-2">No Questionaires found. Create some <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/create')}>here</span></h5>} 

            </div>
            {
            delModal&&
            <div className="absolute w-full h-full top-0 flex justify-center items-center bg-black bg-opacity-20">
                <div id="del-cnf-modal" className="w-1/5 flex flex-col justify-center items-center bg-white">
                    <div className="flex justify-center items-center">
                        <p className="p-2 m-4">Are you sure?</p>
                    </div>
                    <div className="w-full flex justify-evenly items-center">
                        <button className="flex-1 p-2 m-4 bg-primaryBlue">Yes</button>
                        <button onClick={() => setDelModal(false)} className="flex-1 p-2 m-4 bg-red-400">No</button>
                    </div>
                </div>
            </div>
            }
        </div>
        :<PublicErrorPage text={errorText}/>
    )
}