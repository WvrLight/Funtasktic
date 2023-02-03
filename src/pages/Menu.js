import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './pages.css';

export default function Menu() {
  const navigate = useNavigate()
  const [user, setUser] = useState('User')

  useEffect(() => {
    checkLoginStatus()
  }, []);

  function checkLoginStatus() {
    if (sessionStorage.getItem("funtasktic-id") === null) {
      alert('Please log in!')
      navigate('../../')
    }
    else {
      setUser(sessionStorage.getItem('funtasktic-username'))
    }
  }

  return (
    <div className="MenuPage">
      <div className="WelcomeMessage">
        <h1>Welcome, {user}!</h1>
      </div>
    </div>
  )
}
