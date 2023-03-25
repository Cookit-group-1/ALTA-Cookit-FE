import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandinPage from './Pages/LandinPage'
import Timeline from './Pages/Timeline'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
