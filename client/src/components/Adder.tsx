import { useState } from "react"
import { Editor } from "@tinymce/tinymce-react";
import plusSign from "../../public/plus.svg";
export default function Adder(props: any) {
    const [ask, setAsk] = useState("");
    const [askBlank, setAskBlank] = useState(false);
    const [answer, setAnswer] = useState("");
    const [answerBlank, setAnswerBlank] = useState(false);
    return (
        <div className="absolute w-full h-full bg-gray-200 top-0 flex justify-center items-center z-0">
            <div ref={props.modalRef} id="adder-container" className="flex flex-col m-4 p-2 border border-gray-200 bg-white z-20">
                <div id="adder-inputs" className="flex flex-col justify-center items-start h-[500px]">
                    <label className="font-semibold m-2 mb-0 p-2">Question</label>
                    <input onChange={(e) => {
                        setAsk(e.target.value)
                        setAskBlank(false);
                    }} className={`w-full h-12 m-2 p-2 border rounded-lg border-gray-100 ${askBlank?'bg-red-100':'bg-white'}`} placeholder='question'/>
                    
                    {/* <textarea rows={4} onChange={(e) => {
                        console.log(e.target.value);
                        setAnswer(e.target.value);
                        setAnswerBlank(false);
                        console.log(answer);
                        }} className={`w-full p-2 border border-gray-100 rounded-bl-xl ${answerBlank?'bg-red-100':'bg-white'}`} placeholder={`${answerBlank?'answer cannot be blank':'answer'}`} />
                        */}
                        <label className="font-semibold m-2 mb-0 pl-2 pr-2">Answer</label>
                        <div className={`w-full h-full p-2 ${answerBlank?'bg-red-100':'bg-white'}`}>
                        
                            <Editor
                            apiKey="2o3sk03e8b1eju7yi39u52gfpytz5ci52ffy5bcleaujmzk2"
                            initialValue=""
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
                                        font-family: monospace;
                                    }
                                    `,
                            }}
                            onEditorChange={(content) => {
                                setAnswer(content);
                            }}
                            />
                        </div>
                    </div>
                    <div id="adder-btn" className="flex justify-end bg-white">
                        <button onClick={() => {
                            
                            setAskBlank(false);
                            setAnswerBlank(false);
                            
                            if(ask === "") setAskBlank(true);
                            if(answer == "") setAnswerBlank(true);
                            console.log(answer);
                            console.log(answerBlank);
                            if(ask !== "" && answer !==""){
                                // props.setId(prevId: any => prevId+1);
                                // const newItem = {
                                //     id : props.id,
                                //     ask: ask,
                                //     answer: answer
                                // };
                                // props.setSlidesData((prevState: any) => [...prevState, newItem]);
                                props.setSlidesDataBlank(false);
                            }
                            
                        }} className="bg-primaryBlue flex justify-center items-center m-2 p-1 rounded-md">
                        <span className=" text-white font-bold text-xl p-2">Add</span>
                        <img src={plusSign} className="w-8 h-8 cursor-pointer text-white "/>
                        </button> 
                    </div>
                </div>
            </div>
        )
    }