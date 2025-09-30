import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // Show success message
        setSuccessMessage(`Registration successful! Welcome ${formData.username || formData.email}!`)
        
        // Store token and user data if provided in the response
        if (data.data?.accessToken) {
          localStorage.setItem('token', data.data.accessToken)
          localStorage.setItem('userData', JSON.stringify(data.data.user))
          
          // Update authentication
          setIsAuthenticated(true)
          
          // Redirect after a brief delay to show the success message
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          // If no auto-login, redirect to login page after showing success message
          setTimeout(() => {
            navigate('/login')
          }, 1500)
        }
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Server error. Please try again later.')
      console.error(err)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
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
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
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
            minLength="6"
          />
        </div>
        
        <button type="submit" className="submit-btn">Register</button>
      </form>
      
      <div className="auth-links">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  )
}

export default Register