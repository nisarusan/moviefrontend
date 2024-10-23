import React, {useContext, useEffect, useState} from 'react';
import avatarDefault from '../../assets/avatar.png';
import './ProfileDropdown.css';
import {useAuthentication} from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";
import {AvatarContext} from "../../context/AvatarContext.jsx";

const ProfileDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { avatar } = useContext(AvatarContext);
    const { username, userAuthorities } = useAuthentication();
    const { isLoggedIn, handleLogout } = useAuthentication();
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const fetchAvatar = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/images/download/${username}`);
            if (response.ok) {
                const blob = await response.blob();
                setAvatar(URL.createObjectURL(blob));
            } else {
                console.error('Failed to fetch avatar');
                setAvatar(avatarDefault); // Fall back op default avatar
            }
        } catch (error) {
            console.error('Error fetching avatar:', error);
            setAvatar(avatarDefault); // Fallback op default avatar
        }
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
                    {/* Call onLogout function when the button is clicked */}
                    <button onClick={handleLogout}>Log out</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;