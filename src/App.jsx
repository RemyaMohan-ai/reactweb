import { useState } from 'react'
import {Route, Routes , BrowserRouter} from 'react-router'

import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home></Home>} ></Route>
        <Route path='/signin' element ={<Signin></Signin>} ></Route>
        <Route path='/signup' element ={<Signup></Signup>} ></Route>
        <Route path='/about' element ={<About></About>}></Route>
      </Routes>
    
    
    </BrowserRouter>
    </>
  )
}

export default App
