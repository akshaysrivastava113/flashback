"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateQuestionaire;
const react_1 = require("react");
const plus_svg_1 = __importDefault(require("../../public/plus.svg"));
const cross_svg_1 = __importDefault(require("../../public/cross.svg"));
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const tinymce_react_1 = require("@tinymce/tinymce-react");
const react_router_dom_1 = require("react-router-dom");
const react_spinners_1 = require("react-spinners");
const PublicErrorPage_1 = __importDefault(require("./PublicErrorPage"));
const SecondaryButton_1 = __importDefault(require("./SecondaryButton"));
function CreateQuestionaire(props) {
    const errorText = (<><p>Looks like you don't have access to this page!</p><p>Please <a className="text-blue-400 cursor-pointer" href="/signin">sign in</a> to continue.</p></>);
    const signedIntoken = js_cookie_1.default.get("fl-token");
    const signedInUser = js_cookie_1.default.get("fl-token") ? true : false;
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const MIN_LIMIT = 1;
    const MAX_LIMIT = 10;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [qTitle, setQTitle] = (0, react_1.useState)("");
    const [qTitleBlank, setQTitleBlank] = (0, react_1.useState)(false);
    const [noOfSlides, setNoOfSlides] = (0, react_1.useState)(1);
    const [ask, setAsk] = (0, react_1.useState)("");
    const [askBlank, setAskBlank] = (0, react_1.useState)(false);
    const [answer, setAnswer] = (0, react_1.useState)("");
    const [answerBlank, setAnswerBlank] = (0, react_1.useState)(false);
    const [slidesData, setSlidesData] = (0, react_1.useState)([]);
    const [slidesDataBlank, setSlidesDataBlank] = (0, react_1.useState)(false);
    const [id, setId] = (0, react_1.useState)(1);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const publishQuest = () => {
        if (qTitle === "")
            setQTitleBlank(true);
        if (slidesData.length === 0)
            setSlidesDataBlank(true);
        if (qTitle !== "" && slidesData.length !== 0) {
            setLoading(true);
            const finalObj = {
                questTitle: qTitle,
                slidesData: slidesData
            };
            axios_1.default.post(`${backend_url}` + `/api/v1/create`, finalObj, {
                headers: {
                    "Authorization": `Bearer ${signedIntoken}`
                }
            })
                .then((res) => {
                console.log(res);
                navigate('/');
            })
                .catch((err) => {
                console.error(err);
            })
                .finally(() => {
                setLoading(false);
            });
        }
    };
    return (signedInUser ?
        <>
        <div className="flex flex-col justify-start items-center">
            <div id="questionaire-form" className="w-full lg:w-2/3 h-full flex flex-col justify-center items-center p-2 md:p-5 border-l border-r border-b border-gray-200">
            
                <div className="w-full flex flex-col justify-start m-5 p-5">
                    <label className="font-semibold m-2 p-2">Questionaire Title</label>
                    <input onChange={(e) => {
                setQTitle(e.target.value);
                setQTitleBlank(false);
            }} className={`m-2 p-2 border border-gray-100 rounded-md ${qTitleBlank ? 'bg-red-100' : 'bg-white'}`} placeholder={`${qTitleBlank ? 'title cannot be blank' : 'title'}`}/>
                </div>
            
           
        
            <div id="slides-grid-container" className={`w-full flex flex-wrap justify-center mt-18 m-5 p-5 rounded-xl ${slidesDataBlank ? 'bg-red-100' : 'bg-white'}`}>
                {slidesData.map((slide) => {
                return (<div id="slide-container" className="w-40 md:w-48 lg:w-56 h-40 md:h-48 lg:h-56 flex flex-col m-4 p-2 border border-gray-100 rounded-xl shadow-lg transition duration-100 ease-in-out transform hover:scale-110">
                            <div id="slide-header" className=" flex justify-between">
                                <p>{slide.id}</p>
                                <button id="del-btn" onClick={() => {
                        setSlidesData((prevArray) => {
                            //TODO: do it in one loop
                            //remove the slide
                            const newArray = prevArray.filter((item) => item.id !== slide.id);
                            //sync up the ids post delete
                            newArray.map((item) => {
                                console.log(item.id);
                                if (item.id > slide.id) {
                                    item.id = item.id - 1;
                                }
                            });
                            setId(prevId => prevId - 1);
                            console.log(newArray);
                            return newArray;
                        });
                    }}><img src={cross_svg_1.default} className="w-8 h-8 p-1 transition duration-100 ease-in-out transform hover:scale-110"/></button>
                            </div>
                            <div id="slide-content" className="flex flex-col overflow-hidden">
                                <p className="text-xl break-words line-clamp-5">{slide.ask}</p>
                            </div>
                        </div>);
            })}

                <div id="adder-container" className="w-full flex justify-evenly m-4 p-2 border border-gray-200">
                    <div id="adder-inputs" className="w-2/3 flex flex-col justify-center items-start h-[500px]">
                        <label className="font-semibold m-2 mb-0 p-2">Question</label>
                        <input onChange={(e) => {
                setAsk(e.target.value);
                setAskBlank(false);
            }} className={`w-full h-12 m-2 p-2 border rounded-lg border-gray-100 ${askBlank ? 'bg-red-100' : 'bg-white'}`} placeholder='question'/>

                        {/* <textarea rows={4} onChange={(e) => {
                console.log(e.target.value);
                setAnswer(e.target.value);
                setAnswerBlank(false);
                console.log(answer);
                }} className={`w-full p-2 border border-gray-100 rounded-bl-xl ${answerBlank?'bg-red-100':'bg-white'}`} placeholder={`${answerBlank?'answer cannot be blank':'answer'}`} />
                  */}
                              <label className="font-semibold m-2 mb-0 pl-2 pr-2">Answer</label>
                        <div className={`w-full h-full p-2 ${answerBlank ? 'bg-red-100' : 'bg-white'}`}>
                        
                        <tinymce_react_1.Editor apiKey="2o3sk03e8b1eju7yi39u52gfpytz5ci52ffy5bcleaujmzk2" initialValue="" init={{
                placeholder: "Write your content here...",
                height: 300,
                width: "100%",
                menubar: false,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount codesample",
                ],
                toolbar: "undo redo | codesample | formatselect | bold italic backcolor " +
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
            }} onEditorChange={(content) => {
                setAnswer(content);
            }}/>
                        </div>
                    </div>
                    <div id="adder-btn" className="flex justify-end w-1/3">
                            <button onClick={() => {
                setAskBlank(false);
                setAnswerBlank(false);
                if (ask === "")
                    setAskBlank(true);
                if (answer == "")
                    setAnswerBlank(true);
                console.log(answer);
                console.log(answerBlank);
                if (ask !== "" && answer !== "") {
                    setId(prevId => prevId + 1);
                    const newItem = {
                        id: id,
                        ask: ask,
                        answer: answer
                    };
                    setSlidesData((prevState) => [...prevState, newItem]);
                    setSlidesDataBlank(false);
                }
            }} className="w-16 md:w-20 lg:w-24 bg-primaryBlue text-white font-bold shadow-lg relative overflow-hidden group">
                            <span className="absolute top-0 left-0 w-full h-0 bg-white opacity-20 transition-all duration-300 group-hover:h-full"></span>
                            <span className="flex justify-center items-center"><img src={plus_svg_1.default} className="w-8 h-8 cursor-pointer text-white "/></span>
                            </button> 
                        </div>
                    </div>

            </div>
            <div className="w-full flex justify-center mt-4 md:mt-8">
                <div className="flex justify-center mb-16">
                    <SecondaryButton_1.default customTailwind="w-60 md:w-80 lg:w-96" execFunc={publishQuest} text={loading ? <react_spinners_1.BeatLoader color="#485aff" size={5}/> : 'Publish'}/> 
                </div>
            </div>
            </div>
        </div>
       
        </>
        : <PublicErrorPage_1.default text={errorText}/>);
}
