interface errorProps {
    errorOccurred: string,
    text: string
}

export default function ErrorOccurred(props: errorProps) {
    return (
        <div className={`flex justify-center mb-6 m-4 border-2 border-red-300 transition-all duration-200 ease-in-out overflow-hidden ${props.errorOccurred ? 'max-h-96 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'}`}>
        <p className={`text-red-600 font-bold p-2`}>{props.text}</p>
        </div>
    )
}