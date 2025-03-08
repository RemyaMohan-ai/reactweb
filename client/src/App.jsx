import { useState } from 'react'
import {Route, Routes , BrowserRouter} from 'react-router'

import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'


import Navbar  from './components/Navbar'
import PrivateRoute from './components/privateRoute'
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>

      <Routes>
        <Route path='/' element ={<Home></Home>} ></Route>
        <Route path='/signin' element ={<Signin></Signin>} ></Route>
        <Route path='/signup' element ={<Signup></Signup>} ></Route>
        <Route path='/about' element ={<About></About>}></Route>
        <Route element ={<PrivateRoute />}>
        <Route path='/profile' element ={<Profile></Profile>}></Route>
        </Route>
      </Routes>
    
    
    </BrowserRouter>
    </>
  )
}

export default App
