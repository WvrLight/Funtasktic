import React, { useEffect } from 'react';
import './pages.css';
import {useNavigate} from 'react-router-dom';

export default function Landing_or_signup(props) {
  const navigate = useNavigate();

    useEffect(() => {
        checkLoginStatus()
    }, []);

    function checkLoginStatus() {
        if (sessionStorage.getItem("funtasktic-id") !== null) {
            navigate('u/')
        }
        else {
        }
    }

    const handleRegister = (event) => {
        event.preventDefault()

        const password = event.target.password.value
        const password_confirm = event.target.password_confirm.value

        if (password === password_confirm) {
            const user_obj = {
                'username': event.target.username.value,
                'nickname': event.target.username.value,
                'password': event.target.password.value,
            }

            fetch('https://funtasktic-db.fly.dev/user/add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_obj),
            })
                .then(response => {
                    return response.text();
                })
        }
        else {

        }
    }

  return (
    <div className="LandingPage">
        <div className="Body">
            <nav className="NavBar">
                <div className="Navigations">
                    <div className="Logo" >
                        <img src={require("../images/funtasktic_logo.png")} alt="Funtasktic Logo"/>
                    </div>
                    <button type="button" onClick={()=>  navigate("/login")}>Log In</button>
                </div>
            </nav>
            <div className="Container">
                <div className="LandingMessage">
                    <h1>
                        Experience a fun way of<br/>
                        completing tasks.
                    </h1>
                    <p>
                        Set your goals, work, and gain exciting rewards<br/>
                        throughout the process.
                    </p>
                </div>
                <div className="SignUp">
                    <h1>Sign Up</h1>
                    <div className="InputContainer">
                        <form method="post" onSubmit={handleRegister} className="SignUpForm">
                            <input type="text" name="username" placeholder="Username"/>
                            <input type="password" name="password" placeholder="Password"/>
                            <input type="password" name="password_confirm" placeholder="Confirm Passsword"/>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                    <p>
                        By creating this account, you agree to our<br/>
                        <a href="">Privacy Policy & Terms of Service</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
