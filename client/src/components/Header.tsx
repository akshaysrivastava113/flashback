import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate();
    return (
        <div id="header" className=" bg-red-400 flex justify-between items-center h-16">

            <div id="header-left" className="m-2 cursor-pointer">
                <a onClick={() => navigate('/')}>This is the header component</a>
            </div>
            
            <div id="header-right" className="m-2 cursor-pointer">
                <a onClick={() => navigate('/about')}>This is the header component</a>
            </div>

        </div>
    )
}