import { useNavigate } from "react-router-dom";
import pencilSquareWhiteSign from "../../../public/pencilSquareWhite.svg";
import crossWhiteSign from "../../../public/crosswhite.svg";
export default function QuestionaireDisplay(props: any) {
    const navigate = useNavigate();
    return (
        <>
        <div className="relative w-40 md:w-48 lg:w-64 h-40 md:h-48 lg:h-64 rounded-lg m-2 cursor-pointer overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300"
        style={{ backgroundImage: `url(${props.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 flex flex-col bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-bg duration-300">
                {/* Text */}
                <div onClick={() => navigate(`/quest/${props.questId}`)} className="h-full bottom-4 left-0 w-full text-center flex justify-center items-center">
                    <p className="text-white text-lg font-semibold">
                        {props.title}
                    </p>
                </div>
                <div id="crud-ops" className="flex">
                    {props.editBtn&&
                    <div onClick={() => {
                        console.log("Clicked edit");
                        navigate(`/edit/${props.questId}`);
                    }} className=" h-16 flex-1 flex justify-center items-center bg-opacity-30 hover:bg-white hover:bg-opacity-50">
                        <img src={pencilSquareWhiteSign} className="font-semibold w-8 h-8 p-1"/>
                    </div>}
                    {props.delBtn&&
                    <div id={props.questId} onClick={() => {
                        props.setDelModal(true);
                        props.setClickedId(props.questId)
                    }} className="h-16 flex-1 flex justify-center items-center bg-opacity-30 hover:bg-white hover:bg-opacity-50">
                        <img src={crossWhiteSign} className="font-semibold w-8 h-8 p-1"/>
                    </div>}
                </div>
            </div>

        </div>
        
        </>
        
    )
}