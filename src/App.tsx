import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandinPage from './Pages/LandinPage'
import Timeline from './Pages/Timeline'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import Follow from './Pages/Follow'
import Search from './Pages/Search'
import Recipe from './Pages/Recipe'

import Payment from './Pages/Payment'
import { useParams } from 'react-router-dom'
import History from './Pages/History'
import { GoogleOAuthProvider } from '@react-oauth/google';
import DetailHostory from './Pages/DetailHistory'
import RecipeForm from './Pages/RecipeForm'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'



function App() {
  const params = useParams()
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:recipeID" element={<Recipe />} />
          <Route path="/recipe/:recipeID/edit" element={<RecipeForm />} />
          <Route path="/recipe/new" element={<RecipeForm />} />
          <Route path="/profile/:userID" element={<Profile />} />


          
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/detailhistory" element={<DetailHostory />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
