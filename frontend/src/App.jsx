import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on page load
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/" /> : <Register setIsAuthenticated={setIsAuthenticated} />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App