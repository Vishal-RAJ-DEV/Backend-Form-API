import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // Show success message with user data
        setSuccessMessage(`Welcome back ${data.data?.user?.username || data.data?.user?.email}!`)
        
        // Store both token and user data
        const token = data.data?.accessToken
        localStorage.setItem('token', token)
        localStorage.setItem('userData', JSON.stringify(data.data?.user))
        
        // Update authentication
        setIsAuthenticated(true)
        
        // Redirect after a brief delay to show the success message
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Server error. Please try again later.')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      
      <div className="auth-links">
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  )
}

export default Login