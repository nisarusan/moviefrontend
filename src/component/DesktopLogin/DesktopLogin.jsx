import React from 'react';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import './DesktopLogin.css';
import {useAuthentication} from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";
import {Link} from "react-router-dom";

const DesktopLogin = () => {
    const { isLoggedIn, handleLogout } = useAuthentication();

    return (
        <div className="desktop-login-container">
            {isLoggedIn ? (
                <ProfileDropdown onLogout={handleLogout} />
            ) : (
                <Link to="/login"><p className="login-button">Login</p></Link>
            )}
        </div>
    );
};

export default DesktopLogin;
