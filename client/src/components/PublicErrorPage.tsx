import { useNavigate } from "react-router-dom"

export default function PublicErrorPage(props: any){
    const navigate = useNavigate();
    return (
        <div className="flex justify-center w-full">
            {props.text}
        </div>
    )
}