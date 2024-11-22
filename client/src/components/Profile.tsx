import axios from "axios"
import { useEffect, useState } from "react"
import QuestionaireDisplay from "./QuestionaireDisplay";
import Cookies from "js-cookie";
import bgImage1 from '../../public/a_cartoony_textless_science_trivia_youtube_thumbnail.jpeg';
import bgImage2 from '../../public/cartoony_textless_maths_trivia_youtube_thumbnail.jpeg';
import bgImage3 from '../../public/cartoony_textless_history_trivia_youtube_thumbnail_with.jpeg';
import PublicErrorPage from "./PublicErrorPage";
import { RotateLoader } from 'react-spinners';
import { useRecoilState } from "recoil";
import { profileSelected } from "../store/atoms/profileSelected";

interface Quest {
    id: string;
    title: string;
    authorId: string;
}

export default function Profile(props:any){
    const signedIntoken: string = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const [questionaires, setQuestionaires] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
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

    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a href="/signin">sign in</a> to continue.</p></>);

    if(loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <RotateLoader color="#F87171" loading={loading} />
            </div>
        )
    }


    return (
        <div id="profile" className={`flex flex-col flex-wrap h-screen ${signedInUser?'justify-start':'justify-center'}`}>
            <div id="my-quests-title" className="m-2 p-2">
                <h2 className="text-xl font-bold">My Questionaires</h2>
            </div>
            <div id="my-quests" className="flex justify-start flex-wrap">

                {signedInUser?questionaires.map((questItem) => {
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

                        <QuestionaireDisplay bgImage={bgImageUrl} key={questItem.id} id={questItem.id} title={questItem.title} />
                    )
                }):<PublicErrorPage text={errorText}/>}
          </div>
        </div>
    )
}