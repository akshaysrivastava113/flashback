"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const Home_1 = __importDefault(require("./components/Home"));
const Header_1 = __importDefault(require("./components/Header"));
const SlidesDisplay_1 = __importDefault(require("./components/SlidesDisplay"));
const Signup_1 = __importDefault(require("./components/Signup"));
const Signin_1 = __importDefault(require("./components/Signin"));
const CreateQuestionaire_1 = __importDefault(require("./components/CreateQuestionaire"));
const Profile_1 = __importDefault(require("./components/Profile"));
function App() {
    const [count, setCount] = (0, react_1.useState)(0);
    return (<div className='h-full'>
      <react_router_dom_1.BrowserRouter>
      <Header_1.default />
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path='/' element={<Home_1.default />}/>
          <react_router_dom_1.Route path='/signup' element={<Signup_1.default />}/>
          <react_router_dom_1.Route path='/signin' element={<Signin_1.default />}/>
          <react_router_dom_1.Route path='/profile' element={<Profile_1.default />}/>
          <react_router_dom_1.Route path='/create' element={<CreateQuestionaire_1.default />}/>
          <react_router_dom_1.Route path='/quest/:questIdParam' element={<SlidesDisplay_1.default />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </div>);
}
exports.default = App;
