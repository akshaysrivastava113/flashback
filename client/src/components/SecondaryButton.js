"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SecondaryButton;
const react_router_dom_1 = require("react-router-dom");
function SecondaryButton(props) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<button onClick={() => {
            if (props.navigateTo) {
                navigate(`${props.navigateTo}`);
            }
            else if (props.execFunc) {
                props.execFunc();
            }
        }} className={`${props.customTailwind} w-24 md:w-32 border border-primaryBlue m-2 p-2 bg-white text-primaryBlue font-semibold rounded-xl shadow-lg hover:opacity-80`}>{props.text}</button>);
}
