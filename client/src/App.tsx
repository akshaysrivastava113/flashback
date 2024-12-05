import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/common/Home';
import Test from './components/common/Test'
import Header from './components/common/Header';
import SlidesDisplay from './components/display/SlidesDisplay';
import Signup from '../src/components/auth/Signup';
import Signin from '../src/components/auth/Signin';
import CreateQuestionaire from './components/create/CreateQuestionaire';
import Profile from './components/profile/Profile';

function App() {

  return (
    <div className='h-full'>

      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create' element={<CreateQuestionaire/>}/>
          <Route path='/quest/:questIdParam' element={<SlidesDisplay/>}/>
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App
