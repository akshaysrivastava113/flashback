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
        }} className={`${props.customTailwind} w-24 md:w-32 flex justify-evenly items-center border border-primaryBlue m-2 p-2 bg-primaryBlue text-white font-semibold rounded-xl shadow-lg hover:opacity-80`}>{props.text}
        {props.tailIcon&&<img src={props.tailIcon} className="w-6" />}
        </button>
    )
}