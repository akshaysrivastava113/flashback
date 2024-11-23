import { useNavigate } from "react-router-dom"
import { Home, RefreshCcw, ArrowLeft } from 'lucide-react';

export default function PublicErrorPage(props: any){
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                
                    <div className="mb-8 text-gray-400 flex justify-center">
                        <div className="text-8xl font-bold">4</div>
                            <div className="mx-2">
                                <RefreshCcw size={64} className="animate-spin-slow mt-4" />
                            </div>
                        <div className="text-8xl font-bold">4</div>
                    </div>
                    
                    {/* Error Message */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {props.text}
                    </h1>
                    <p className="text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                    Don't worry though, we've got your back.
                    </p>
                </div>
            </div>
        </div>
    )
}