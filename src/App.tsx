import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandinPage from './Pages/LandinPage'
import Timeline from './Pages/Timeline'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import Follow from './Pages/Follow'
import Payment from './Pages/Payment'
import { useParams } from 'react-router-dom'
function App() {
  const params = useParams()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/cart" element={<Cart />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/payment" element={<Payment />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
