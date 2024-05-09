import React, { useState, useEffect } from 'react';
import './Login.css';
import MovieIntro from '../../assets/movies_intro.png';
import MovieFlixLogo from '../../assets/movieflix_logo-white.svg?react';
import {Link} from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // useEffect(() => {
    //     // Check if a JWT token exists in localStorage
    //     const jwtToken = localStorage.getItem('jwtToken');
    //
    //     if (jwtToken) {
    //         // Redirect to dashboard if token exists
    //         window.location.href = '/profile';
    //     }
    // }, []); // Empty dependency array ensures this effect runs only once on component mount

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const { jwt } = await response.json();

                // Store the JWT token in localStorage
                localStorage.setItem('jwtToken', jwt);

                // Redirect to dashboard upon successful login
                window.location.href = '/profile';
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <section className="login">
            <div className="login-intro">
                <div className="login-img">
    <img src={MovieIntro} alt="Movie Intro" />
                </div>
                <div className="login-description">
                    <h2>Series en Films op MovieFlix</h2>
                    <p>Zie de laatste films en series op MovieFlix
                        Maak een account aan en maak een favorieten lijst aan</p>
                </div>
            </div>
            <div className="login-form">
                <div className="login-logo"><MovieFlixLogo /></div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username or Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username or email"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p className="form-group--text">
                        Nieuw?  <Link to="/register" className="form-group--register">Maak dan eerst een account aan</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;
