import React, { useState } from 'react';
import Avatar from '../../assets/avatar.png';
import './ProfileDropdown.css';
import {useAuthentication} from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";

const ProfileDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, handleLogout } = useAuthentication();
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="profile-dropdown-container">
            <div className="avatar" onClick={toggleDropdown}>
                <img src={Avatar} alt="User Avatar" />
                <button className="profile-button">Profile</button>
                {showDropdown ? <div className="arrow-up"></div> : <div className="arrow-down"></div>}
            </div>
            {showDropdown && (
                <div className="dropdown-content">
                    <a href="/profile">Mijn profiel</a>
                    {/* Call onLogout function when the button is clicked */}
                    <button onClick={handleLogout}>Log out</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
