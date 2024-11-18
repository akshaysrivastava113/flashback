import { useNavigate } from "react-router-dom"

export default function PrimaryButton(props: any){
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`${props.navigateTo}`)} className="w-32 border-2 m-2 p-1 bg-red-400 text-white font-semibold">{props.text}</button>
    )
}