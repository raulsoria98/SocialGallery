import { Routes, Route } from 'react-router-dom'
import './App.scss'

import Home from '#Pages/Home.jsx'
import Profile from '#Pages/Profile.jsx'
import Layout from '#Components/Layout.jsx'
import Login from '#Pages/Login.jsx'

export default function App () {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<h1>Sign Up</h1>} />
        <Route path='/profile' element={<Profile />} />

        {/* Catch all other routes */}
        <Route path='*' element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  )
}
