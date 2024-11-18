import { useNavigate } from "react-router-dom"

export default function PublicErrorPage(props: any){
    const navigate = useNavigate();
    return (
        <div className="flex justify-center w-full">
            <p>Looks like you don't have access to this page!</p>
            <p>Please <a onClick={() => navigate(`/signin`)}>sign in</a> to continue.</p>
        </div>
    )
}