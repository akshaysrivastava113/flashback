import axios from "axios"
import { useEffect, useState } from "react"
import QuestionaireDisplay from "./QuestionaireDisplay";
import Cookies from "js-cookie";
import bgImage1 from '../../public/a_cartoony_textless_science_trivia_youtube_thumbnail.jpeg';
import bgImage2 from '../../public/cartoony_textless_maths_trivia_youtube_thumbnail.jpeg';
import bgImage3 from '../../public/cartoony_textless_history_trivia_youtube_thumbnail_with.jpeg';
import PublicErrorPage from "./PublicErrorPage";
import { RotateLoader } from 'react-spinners';

interface Quest {
    id: string;
    title: string;
    authorId: string;
}


export default function Home() {
    const signedIntoken: string | any = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const [questionaires, setQuestionaires] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
    let bgImageUrl: string;

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const allQuestionaires = await axios.get<Quest[]>(`${backend_url}/`, {
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
        <div id="home" className={`flex flex-wrap h-[90%] ${signedInUser?'justify-start':'justify-center'}`}>
            <div className="flex justify-center md:justify-center lg:justify-start flex-wrap w-full mt-10">
                
                {signedInUser?questionaires.map((questItem) => {
                    if(questItem.title === "Science"){
                        bgImageUrl = bgImage1;
                    } else if(questItem.title === "Maths"){
                        bgImageUrl = bgImage2;
                    } else if (questItem.title === "History"){
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