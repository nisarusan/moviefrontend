import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = ({ isLoggedIn }) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown); // Toggle the profile dropdown
    };

    const closeProfileDropdown = () => {
        setShowProfileDropdown(false); // Close the profile dropdown
    };

    return (
        <div className="mobile-menu">
            {/* Menu toggle button */}
            <input id="menu-toggle" type="checkbox" checked={showProfileDropdown} onChange={() => {}} />
            <label className="menu-button-container" htmlFor="menu-toggle" onClick={toggleProfileDropdown}>
                <div className="menu-button"></div>
            </label>

            {/* Main menu items */}
            <ul className="menu">
                <li><Link to="/" onClick={closeProfileDropdown}>Home</Link></li>
                <li><Link to="/genre" onClick={closeProfileDropdown}>Genre</Link></li>
                <li><Link to="/films" onClick={closeProfileDropdown}>Films</Link></li>
                <li><Link to="/series" onClick={closeProfileDropdown}>Series</Link></li>

                {/* Render profile menu item if user is logged in */}
                {isLoggedIn && (
                    <li className="profile-menu-item">
                        <div onClick={toggleProfileDropdown}>Profile</div>
                        {/* Render the profile dropdown when menu is open */}
                        {showProfileDropdown && (
                            <ul className="profile-dropdown">
                                <li><Link to="/favorites" onClick={closeProfileDropdown}>Favorites</Link></li>
                                <li onClick={closeProfileDropdown}>Logout</li>
                            </ul>
                        )}
                    </li>
                )}

                {/* Render login link if user is not logged in */}
                {!isLoggedIn && (
                    <li><Link to="/login" onClick={closeProfileDropdown}>Login</Link></li>
                )}
            </ul>
        </div>
    );
};

export default MobileMenu;
