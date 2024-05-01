import React, { useState } from 'react';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        enabled: true, // assuming 'enabled' is a boolean
        address: '',
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
                alert('User registered successfully!');
                // Reset form after successful registration
                setFormData({
                    username: '',
                    password: '',
                    email: '',
                    enabled: true,
                    address: '',
                    profileUrl: ''
                });
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <section className="register">
            <div className="register-intro">
                <div className="register-img"></div>
                <div className="register-description"></div>
            </div>
            <div className="register-signup">
                <div className="register-logo"></div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
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
                            placeholder="Enter your E-mail"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profileUrl">Profile URL</label>
                        <input
                            type="text"
                            id="profileUrl"
                            name="profileUrl"
                            placeholder="Enter profile URL"
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