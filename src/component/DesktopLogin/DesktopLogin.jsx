import React from 'react';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import './DesktopLogin.css';
import {useAuthentication} from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";

const DesktopLogin = () => {
    const { isLoggedIn, handleLogout } = useAuthentication();

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
