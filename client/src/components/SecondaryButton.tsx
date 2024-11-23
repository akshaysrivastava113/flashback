import { useNavigate } from "react-router-dom"

export default function SecondaryButton(props: any){
    const navigate = useNavigate();

    return (
        <button onClick={() => {
            if(props.navigateTo){
                navigate(`${props.navigateTo}`)
            } else if(props.execFunc) {
                props.execFunc();
            }
        }} className="w-24 md:w-32 border-2 border-white m-2 p-1 bg-white text-red-400 font-semibold rounded-xl hover:opacity-90 ">{props.text}</button>
    )
}