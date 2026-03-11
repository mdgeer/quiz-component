import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HubPage from './pages/HubPage'
import QuizPage from './pages/QuizPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/:slug" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
