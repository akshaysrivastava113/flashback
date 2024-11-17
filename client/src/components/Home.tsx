import axios from "axios"
import { useEffect, useState } from "react"
import QuestionaireDisplay from "./QuestionaireDisplay";

export default function Home() {
    interface Quest {
        id: string;
        title: string;
        authorId: string;
    }

    const [questionaires, setQuestionaires] = useState<Quest[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const allQuestionaires = await axios.get<Quest[]>('http://localhost:3000/', {
                headers: {
                    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFhMWMxZGI0LTM4NDQtNDQ5NS05YzAxLTZiOTk0MGUyMTU3ZiIsImVtYWlsIjoibWFpbm1haW5AdGVzdC5jb20iLCJpYXQiOjE3MzE4NjI0NDV9.nl9eBrQj9NVf48mRmEZ6wLds5FskrTGdjqRFIsUNCJY"
                }
            });
            setQuestionaires(allQuestionaires.data);
            console.log(questionaires);
        };
        fetchData();
    },[])
    return (
        <div id="home" className="flex justify-center">
            <div className="flex justify-center">
                {questionaires.map((questItem) => {
                    return (
                        <QuestionaireDisplay key={questItem.id} id={questItem.id} title={questItem.title} />
                    )
                })}
          </div>
        </div>
    )
}