import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../../assets/avatar.png';
import './DesktopMenu.css';
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown.jsx";

function DesktopMenu({isLoggedIn, handleLogout}) {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };
    return (
        <>
            <nav className="main-menu">
                <ul className="menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/genre">Genre</Link></li>
                    <li><Link to="/films">Films</Link></li>
                    <li><Link to="/series">Series</Link></li>
                </ul>
            </nav>
            <div className="desktop-profile">
                {/* Dropdown Menu */}
                {isLoggedIn && <ProfileDropdown handleLogout={handleLogout}/>}
            </div>
        </>
    )
        ;
}

export default DesktopMenu;
