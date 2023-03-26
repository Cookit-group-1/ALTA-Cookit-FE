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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/timeline/:timeline" element={<Timeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipe/:recipeID" element={<Recipe />} />


        <Route path="/cart" element={<Cart />} />
        <Route path="/follow" element={<Follow />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
