import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react";
import crossSign from "../../../public/cross.svg";
import { BeatLoader } from "react-spinners";
export default function Alter(props: any) {
    const [ask, setAsk] = useState("");
    const [askBlank, setAskBlank] = useState(false);
    const [answer, setAnswer] = useState("");
    const [answerBlank, setAnswerBlank] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log('props.posToSend', props.posToSend);
        const item = props.slidesData.filter((slide: any) => slide.position === props.posToSend);
        setAsk(item[0].ask);
        setAnswer(item[0].answer);
    }, [])
    return (
        <div className="absolute w-full h-full bg-gray-200 bg-opacity-70 top-0 flex justify-center items-center z-0">
            <div id="alter-container" className="flex flex-col m-4 p-2 border border-gray-200 bg-white z-20 rounded-lg">
                {props.posToSend}
                <div className="flex justify-end">
                    <img title="Close" onClick={() => props.setAlterModal(false)} src={crossSign} className="w-8 h-8 p-1 cursor-pointer transition duration-100 ease-in-out transform hover:scale-110"/>
                </div>
                <div id="adder-inputs" className="flex flex-col justify-center items-start h-[500px]">
                    <label title="Add a question for your slide" className="font-semibold m-2 mb-0 p-2">Question</label>
                    <input value={ask} onChange={(e) => {
                        setAsk(e.target.value)
                        setAskBlank(false);
                    }} className={`w-full h-12 m-2 p-2 border rounded-lg border-gray-100 ${askBlank?'bg-red-100':'bg-white'}`} placeholder='question'/>

                        <label title="Add an answer for your slide" className="font-semibold m-2 mb-0 pl-2 pr-2">Answer</label>
                        <div className={`w-full h-full p-2 ${answerBlank?'bg-red-100':'bg-white'}`}>
                            {loading&&<div className="flex justify-center"><BeatLoader color="#485aff" size={5} /></div>}
                            <Editor
                            value={answer}
                            init={{
                                placeholder: "Write your content here...",
                                height: 300,
                                width: "100%",
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount codesample",
                                ],
                                toolbar:
                                "undo redo | codesample | formatselect | bold italic backcolor " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help",
                                codesample_languages: [
                                    { text: "HTML/XML", value: "markup" },
                                    { text: "JavaScript", value: "javascript" },
                                    { text: "CSS", value: "css" },
                                    { text: "Python", value: "python" },
                                    { text: "Java", value: "java" },
                                    { text: "C++", value: "cpp" },
                                ],
                                content_style: `
                                pre {
                                    background-color: #f4f4f4;
                                    padding: 10px;
                                    border-radius: 5px;
                                    font-family: monospace;}`,
                                setup: (editor) => {
                                    editor.on("init", () => {
                                        setLoading(false);
                                    }); // Trigger when TinyMCE is initialized
                                },
                                }}
                                onEditorChange={(content) => {
                                    console.log(content);
                                    setAnswer(content);
                                }}
                                />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div id="discard-btn" className="flex justify-end">
                            <button title="Discard Changes" onClick={() => props.setAlterModal(false)} className="bg-white border border-primaryBlue flex justify-center items-center m-2 p-1 rounded-md">
                                <span className=" text-primaryBlue font-bold text-xl p-1">Discard</span>
                            </button> 
                        </div>

                        
                        <div id="save-btn" className="flex justify-end bg-white">
                            <button title="Save Changes" onClick={() => {
                                
                                setAskBlank(false);
                                setAnswerBlank(false);
                                
                                if(ask === "") setAskBlank(true);
                                if(answer === "") setAnswerBlank(true);
                                console.log(answer);
                                console.log(answerBlank);
                                if(ask !== "" && answer !==""){
                                    props.slidesData.map((slide: any) => {
                                        if(slide.position === props.posToSend){
                                            slide.ask = ask;
                                            slide.answer = answer;
                                        }
                                    });
                                    props.setAlterModal(false);
                                
                                }
                                
                            }} className="bg-primaryBlue flex justify-center items-center m-2 p-1 rounded-md">
                            <span className=" text-white font-bold text-xl p-1">Save</span>
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }