import axios from "axios"
import { useEffect, useState } from "react"
import QuestionaireDisplay from "./QuestionaireDisplay";
import { useParams } from "react-router-dom";

interface Params {
    questIdParam: string; // Define the expected parameters
  }

export default function SlidesDisplay() {
    const { questIdParam } = useParams<Params>();

    interface Slides {
        id: string;
        ask: string;
        answer: string;
    }

    const [slidesState, setSlidesState] = useState<Slides[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            console.log(questIdParam);
            const allSlides = await axios.get<Slides[]>(`http://localhost:3000/${questIdParam}`, {
                headers: {
                    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFhMWMxZGI0LTM4NDQtNDQ5NS05YzAxLTZiOTk0MGUyMTU3ZiIsImVtYWlsIjoibWFpbm1haW5AdGVzdC5jb20iLCJpYXQiOjE3MzE4NjI0NDV9.nl9eBrQj9NVf48mRmEZ6wLds5FskrTGdjqRFIsUNCJY"
                }
            });
            setSlidesState(allSlides.data);
            console.log(allSlides);
        };
        fetchData();
    },[])
    return (
        <div id="home" className="flex justify-center">
            <div className="flex flex-col justify-center items-center">
                {slidesState.map((slideItem) => {
                    return (
                        <div className="border-2 m-2 p-2">
                            <p>{slideItem.ask}</p>
                            <p>{slideItem.answer}</p>
                        </div>
                    )
                })}
          </div>
        </div>
    )
}