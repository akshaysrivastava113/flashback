import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

interface Params {
    questIdParam: string; // Define the expected parameters
  }

  const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function SlidesDisplay() {
    const { questIdParam } = useParams<Params>();
    const signedIntoken: string = Cookies.get("fl-token");
    const signedInUser: boolean = Cookies.get("fl-token")?true:false;

    interface Slides {
        id: string;
        ask: string;
        answer: string;
    }

    const [slidesState, setSlidesState] = useState<Slides[]>([]);
    const [displayAns, setDisplayAns] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            console.log(`${backend_url}/${questIdParam}`);
            const allSlides = await axios.get<Slides[]>(`${backend_url}/${questIdParam}`, {
                headers: {
                     "Authorization":`Bearer ${signedIntoken}`
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
                {signedInUser&&slidesState.map((slideItem) => {
                    return (
                        <div onClick={() => setDisplayAns(true)} className="border-2 m-2 p-2">
                            <p>{slideItem.ask}</p>
                            {displayAns&&<p>{slideItem.answer}</p>}
                        </div>
                    )
                })}
          </div>
        </div>
    )
}