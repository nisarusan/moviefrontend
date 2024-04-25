import React from 'react';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import './DesktopLogin.css';

const DesktopLogin = ({ isLoggedIn }) => {
    const handleLogout = () => {
        // Implement logout functionality
        console.log('Logging out...');
    };

    return (
        <div className="desktop-login-container">
            {isLoggedIn ? (
                <ProfileDropdown onLogout={handleLogout} />
            ) : (
                <button className="login-button">Login</button>
            )}
        </div>
    );
};

export default DesktopLogin;
