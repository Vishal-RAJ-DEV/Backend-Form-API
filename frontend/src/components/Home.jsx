import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [logoutMessage, setLogoutMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      // Get user data from localStorage
      const storedUserData = localStorage.getItem('userData')
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    }
  }, [isAuthenticated, navigate])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setLogoutMessage('Logged out successfully!')
        
        // Clear localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        
        // Update authentication state and navigate
        setIsAuthenticated(false)
        navigate('/login')
      } else {
        console.error('Logout failed:', data.message)
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <div className="home-container">
      <div className="header">
        <div className="user-info">
          <h1>Welcome, {userData?.username || userData?.email || 'User'}!</h1>
          {userData && (
            <p className="user-details">
              {userData.email} • Joined: {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
      {logoutMessage && (
        <div className="success-message logout-message">
          {logoutMessage}
        </div>
      )}

      {isAuthenticated && (
        <div className="content">
          <h2>Your Dashboard Content</h2>
          <p>This is a protected route - only visible when logged in.</p>
          {userData?.fullName && (
            <div className="profile-section">
              <h3>Profile Information</h3>
              <p>Full Name: {userData.fullName}</p>
              <p>Email: {userData.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home