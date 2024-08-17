import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import Login from '../Pages/Login'
import Pagenotfound from '../Pages/Pagenotfound'
import Signup from '../Pages/Signup'
import Taskpage from '../Pages/Taskpage'

const Allroutes = () => {
  return (
    <Routes>
          <Route  path='/' element={<Homepage />}  />
        <Route  path='/signup' element={<Signup />}  />
        <Route  path='/login' element={<Login />}  />
        <Route  path='/task' element={<Taskpage />}  />
        <Route  path='*' element={<Pagenotfound />}  />
    </Routes>
  )
}

export default Allroutes

