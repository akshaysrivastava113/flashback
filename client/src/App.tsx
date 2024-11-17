import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Header from './components/Header';
import SlidesDisplay from './components/SlidesDisplay';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:questIdParam' element={<SlidesDisplay/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
