import React, {useContext, useEffect, useState} from 'react';
import './ProfileDropdown.css';
import {useAuthentication} from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";
import {AvatarContext} from "../../context/AvatarContext.jsx";

const ProfileDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { avatar } = useContext(AvatarContext);
    const { username } = useAuthentication();
    const { isLoggedIn, handleLogout } = useAuthentication();
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="profile-dropdown-container">
            <div className="avatar" onClick={toggleDropdown}>
                <img src={avatar} alt="User Avatar" />
                <button className="profile-button">Profile</button>
                {showDropdown ? <div className="arrow-up"></div> : <div className="arrow-down"></div>}
            </div>
            {showDropdown && (
                <div className="dropdown-content">
                    <a href="/profile">Mijn profiel</a>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;