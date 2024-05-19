import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Edit from './Pages/Edit'
import  Create from './Pages/Create'
import { useState } from 'react'
import EditHome from './Pages/EditHome'


function App() {
  const [id, setId] = useState(0)
  const [length, setlength] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home setlength={setlength} setId={setId}/>}/> 
      <Route path='/create' element={<Create length={length}/>}/> 
      <Route path='/edit/:id' element={<Edit id={id}/>}/> 
      <Route path='/edithome' element={<EditHome setlength={setlength} setId={setId}/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
