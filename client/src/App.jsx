import { Routes, Route } from 'react-router-dom'
import './App.scss'

import { AuthProvider } from '#Contexts/AuthContext.jsx'

import Home from '#Pages/Home.jsx'
import Profile from '#Pages/Profile.jsx'
import Layout from '#Components/Layout.jsx'
import Login from '#Pages/Login.jsx'
import SignUp from '#Pages/SignUp.jsx'
import Gallery from '#Pages/Gallery.jsx'
import UploadArtwork from '#Pages/UploadArtwork.jsx'

export default function App () {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/gallery'>
            <Route path=':type' element={<Gallery />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-artwork' element={<UploadArtwork />} />

          {/* Catch all other routes */}
          <Route path='*' element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
