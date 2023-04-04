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
import NewCooking from './Pages/NewCooking'
import Admin from './Pages/Admin'



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

          <Route path="/:postType/:recipeID" element={<Recipe />} />

          <Route path="/recipes/:recipeID/:editType" element={<RecipeForm />} />
          <Route path="/recipes/new" element={<RecipeForm />} />

          <Route path="/newcooking" element={<NewCooking />} />
          <Route path="/recipes/:recipeID/reply" element={<NewCooking />} />

          <Route path="/verifyusers" element={<Admin />} />

          <Route path="/profile/:userID" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/follow/:userID" element={<Follow />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/detailhistory" element={<DetailHostory />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
