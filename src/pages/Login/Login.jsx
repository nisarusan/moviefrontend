import React, {useState} from 'react';
import './Login.css';
import MovieIntro from '../../assets/movies_intro.png';
import Logo from '../../assets/movieflix_logo-white.svg?react';
import FormInput from '../../component/FormInput/FormInput.jsx';
import { Link } from 'react-router-dom';
import { useLogin } from '../../helper/useLogin.js';

function Login() {
    const { formData, handleInputChange, handleSubmit, feedbackMessage, feedbackType } = useLogin();


    return (
        <section className="login">
            <div className="login-intro">
                <div className="login-img">
                    <img src={MovieIntro} alt="Movie Intro" />
                </div>
                <div className="login-description">
                    <h2>Series en Films op MovieFlix</h2>
                    <p>Zie de laatste films en series op MovieFlix. Maak een account aan en maak een favorietenlijst aan.</p>
                </div>
            </div>
            <div className="login-form">
                <Logo />
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Username or Email"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username or email"
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="******"
                    />
                    <button type="submit">Login</button>
                    <p className="form-group--text">
                        Nieuw? <Link to="/register" className="form-group--register">Maak dan eerst een account aan</Link>
                    </p>
                </form>
                {feedbackMessage && (
                    <div className={`feedback-message ${feedbackType}`}>
                        {feedbackMessage}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Login;