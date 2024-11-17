import { useNavigate } from "react-router-dom"

export default function QuestionaireDisplay(props: any) {
    const navigate = useNavigate();
    return (
        <div>
            <p onClick={() => navigate('/'+props.id)} className="m-2 p-2">{props.title}</p>
        </div>
    )
}