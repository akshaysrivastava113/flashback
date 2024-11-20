import { useNavigate } from "react-router-dom"
export default function QuestionaireDisplay(props: any) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/quest/'+props.id)} style={{ backgroundImage: `url(${props.bgImage})` }} className="border-2 bg-cover bg-center w-64 h-64 rounded-lg m-2 p-2 cursor-pointer hover:bg-opacity-30">
            <div className="bg-black bg-opacity-50 hover:bg-gray-900 transition-all duration-300 p-10">
                <p className="m-2 p-2">{props.title}</p>
            </div>
        </div>
    )
}