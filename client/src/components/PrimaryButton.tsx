import { useNavigate } from "react-router-dom"

export default function PrimaryButton(props: any){
    const navigate = useNavigate();

    return (
        <button onClick={() => {
            if(props.navigateTo){
                navigate(`${props.navigateTo}`)
            } else if(props.execFunc) {
                props.execFunc();
            }
        }} className="w-32 border-2 border-red-400 m-2 p-1 bg-red-400 text-white font-semibold rounded-xl">{props.text}</button>
    )
}