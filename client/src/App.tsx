import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Header from './components/Header';
import SlidesDisplay from './components/SlidesDisplay';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CreateQuestionaire from './components/CreateQuestionaire';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/create' element={<CreateQuestionaire/>}/>
          <Route path='/:questIdParam' element={<SlidesDisplay/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
