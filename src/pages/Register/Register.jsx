import React, { useState } from 'react';
import './Register.css';
import MoviesBg from '../../assets/movies_intro_bg.png';

function Register() {

    const [registrationStatus, setRegistrationStatus] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        enabled: true, // assuming 'enabled' is a boolean
        profileUrl: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send the formData directly as JSON
            });

            if (response.ok) {
                setRegistrationStatus('Sucessvol geregistreerd');
                // Reset de form na succesvol login
                setFormData({
                    username: '',
                    password: '',
                    email: '',
                    enabled: true,
                    profileUrl: ''
                });
            } else {
                const errorData = await response.json();
                setRegistrationStatus(`Registratie gefaald: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Foutmelding registratie gebruiker:', error);
            alert('Registratie mislukt. Probeer het nog eens!s');
        }
    };

    return (
        <section className="register">
            <div className="register-intro">
                <div className="register-img">
                    <img src={MoviesBg} alt="Movies BG"/>
                </div>
                <div className="register-description"></div>
            </div>
            <div className="register-signup">
                <div className="register-logo"></div>
                <form onSubmit={handleSubmit}>
                    {registrationStatus && <div className="registration-feedback">{registrationStatus}</div>}
                    <div className="form-group">
                        <label htmlFor="username">Gebruikersnaam</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Uw gebruikersnaam"
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
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Uw e-mail"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profileUrl">Profile URL</label>
                        {/* Oplossing hier in toekomst voor vinden voor foto */}
                        <input
                            type="text"
                            id="profileUrl"
                            name="profileUrl"
                            placeholder="Profielfoto verwijzing plaatje"
                            value={formData.profileUrl}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </section>
    );
}

export default Register;
