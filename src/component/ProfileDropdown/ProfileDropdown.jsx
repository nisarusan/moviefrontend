import React, { useState } from 'react';
import Avatar from '../../assets/avatar.png';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <div className="profile-dropdown-container">
            <div className="avatar" onClick={toggleDropdown}>
                <img src={Avatar} alt="User Avatar"/>
                <button className="profile-button">Profile</button>
                {showDropdown ? (
                    <div className="arrow-up"></div>
                ) : (
                    <div className="arrow-down"></div>
                )}
            </div>
            {showDropdown && (
                <div className="dropdown-content">
                    <a href="/favorites">Favorite</a>
                    <button onClick={onLogout}>Log out</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
