import { useNavigate } from "react-router-dom"
export default function QuestionaireDisplay(props: any) {
    const navigate = useNavigate();

    return (
        <div
        onClick={() => navigate(`/quest/${props.id}`)}
        className="relative w-40 md:w-48 lg:w-64 h-40 md:h-48 lg:h-64 rounded-lg m-2 cursor-pointer overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300"
        style={{ backgroundImage: `url(${props.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-bg duration-300">
            {/* Text */}
            <div className="absolute bottom-4 left-0 w-full text-center">
            <p className="text-white text-lg font-semibold px-4 mb-4">
                {props.title}
            </p>
            </div>
        </div>
        </div>


    )
}