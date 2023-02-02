import React, { useState, useEffect } from 'react';
import './pages.css';

export default function Menu() {
  const [user, setUser] = useState('User')

  useEffect(() => {
    setUser(sessionStorage.getItem('funtasktic-username'))
  }, []);

  return (
    <div className="MenuPage">
      <div className="WelcomeMessage">
        <h1>Welcome, {user}!</h1>
      </div>
    </div>
  )
}
