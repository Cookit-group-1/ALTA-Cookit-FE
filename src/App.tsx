import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandinPage from './Pages/LandinPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandinPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
