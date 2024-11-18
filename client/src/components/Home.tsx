import axios from "axios"
import { useEffect, useState } from "react"
import QuestionaireDisplay from "./QuestionaireDisplay";
import Cookies from "js-cookie";
import bgImage1 from '../../public/a_cartoony_textless_science_trivia_youtube_thumbnail.jpeg';
import bgImage2 from '../../public/cartoony_textless_maths_trivia_youtube_thumbnail.jpeg';
import bgImage3 from '../../public/cartoony_textless_history_trivia_youtube_thumbnail_with.jpeg';
import PublicErrorPage from "./PublicErrorPage";

export default function Home() {
    const signedIntoken: string = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;
    interface Quest {
        id: string;
        title: string;
        authorId: string;
    }

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const [questionaires, setQuestionaires] = useState<Quest[]>([]);
    let bgImageUrl: string;
    useEffect(() => {
        const fetchData = async () => {
            const allQuestionaires = await axios.get<Quest[]>(`${backend_url}/`, {
                headers: {
                    "Authorization":`Bearer ${signedIntoken}`
                }
            });
            setQuestionaires(allQuestionaires.data);
            console.log(questionaires);
        };
        fetchData();
    },[]);

    return (
        <div id="home" className={`flex ${signedInUser?'justify-start':'justify-center'}`}>
            <div className="flex justify-center">
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
                }):<PublicErrorPage/>}
          </div>
        </div>
    )
}