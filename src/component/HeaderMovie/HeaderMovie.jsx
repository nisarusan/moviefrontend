import movieLogo from '../../assets/movieflix_logo.svg';
import './HeaderMovie.css';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/avatar.png';
import DesktopMenu from "../DesktopMenu/DesktopMenu.jsx";
import DesktopLogin from "../DesktopLogin/DesktopLogin.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import {useAuthentication} from "../../provider/AuthenticationProvider/AuthenticationProvider.jsx";

function HeaderMovie() {
    const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility
    const { isLoggedIn, handleLogout } = useAuthentication();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };

    return (
        <header className="header">
            <div className="header-wrapper">
                <Link to="/" className="logo-link">
                    <img src={movieLogo} alt="Movie Logo" className="logo" />
                </Link>
                {/* Desktop Menu and Profile Dropdown*/}
                <DesktopMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                {/* Desktop Login Button (Show when not logged in) */}
                {!isLoggedIn && <DesktopLogin />}
                <MobileMenu isLoggedIn={isLoggedIn} />

            </div>
        </header>
    );
}

export default HeaderMovie;