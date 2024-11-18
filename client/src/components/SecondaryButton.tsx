import { useNavigate } from "react-router-dom"

export default function SecondaryButton(props: any){
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`${props.navigateTo}`)} className="w-32 m-2 p-1 bg-white text-red-400  font-semibold">{props.text}</button>
    )
}