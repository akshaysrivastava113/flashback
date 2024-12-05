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
        }} className={`${props.customTailwind} w-24 md:w-32 border border-primaryBlue m-2 p-2 bg-white text-primaryBlue font-semibold rounded-xl shadow-lg hover:opacity-80`}>{props.text}</button>
    )
}