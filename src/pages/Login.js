import React from 'react';
import './pages.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    let login_url = `https://funtasktic-db.fly.dev/user/login?username=${username}&password=${password}`

    fetch(login_url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        const login_data = JSON.parse(data);
        if (login_data.rowCount === 1) {
          sessionStorage.setItem('funtasktic-id', login_data.rows[0]['id']);
          sessionStorage.setItem('funtasktic-username', login_data.rows[0]['username']);

          alert("Login successful.")
          navigate("/u")
        }
        else {
          alert("Invalid account details. Please enter a correct username/password.")
        }
      });
  }

  return (
    <div className="LogInPage">
      <div className="Body">
        <nav className="NavBar">
            <div className="Navigations">
              <div className="Logo" onClick={()=>  navigate(-1)}>
                <img src={require("../images/funtasktic_logo.png")} alt="Funtasktic Logo"/>
              </div>
              <button type="button" onClick={()=>  navigate(-1)}>Sign Up</button>
            </div>
        </nav>
        <div className="Container">
            <div className="LogIn">
                <h1>Log In</h1>
                <div className="InputContainer">
              <form method="get" onSubmit={handleLogin} className="LogInForm">
                        <label>Username or Email</label>
                        <input type="text" name="username" placeholder="Username or Email"/>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password"/>
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
