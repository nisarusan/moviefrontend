import movieLogo from '../../assets/movieflix_logo.svg';
import './HeaderMovie.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/avatar.png';

function HeaderMovie() {
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Track user login state

    const handleLogout = () => {
        // Implement logout functionality here
        setIsLoggedIn(false);
        // Optionally, perform additional logout actions (e.g., clearing local storage)
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };
    return (
        <header className="header" style={{ backgroundColor: '#750000' }}>
            <div className="header-wrapper">
                <Link to="/" className="logo-link">
                    <img src={movieLogo} alt="Movie Logo" className="logo" />
                </Link>

                {/* Main Menu - Desktop */}
                <nav className="main-menu">
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/genre">Genre</Link></li>
                        <li><Link to="/films">Films</Link></li>
                        <li><Link to="/series">Series</Link></li>
                    </ul>
                </nav>

                {/* Profile Avatar and Dropdown - Desktop */}
                {isLoggedIn && (
                    <div className="desktop-profile">
                        {/* Profile Picture Avatar (Replace with actual avatar component) */}
                        <div className="avatar" onClick={toggleDropdown}>
                            <img src={Avatar} alt="User Avatar"/>
                            <button className="dropbtn">Profile</button>
                        </div>
                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="dropdown">
                                <div className="dropdown-content">
                                    <Link to="/favorites">Favorite</Link>
                                    <button onClick={handleLogout}>Log out</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Login Button - Desktop (Show when not logged in) */}
                {!isLoggedIn && (
                    <div className="desktop-login">
                        <Link to="/login" className="login-button">Login</Link>
                    </div>
                )}

                {/* Mobile Menu Icon and Menu - Mobile */}
                <div className="mobile-menu">
                    <input id="menu-toggle" type="checkbox" checked={showMenu} onChange={() => setShowMenu(!showMenu)} />
                    <label className="menu-button-container" htmlFor="menu-toggle">
                        <div className="menu-button"></div>
                    </label>
                    <ul className={`menu ${showMenu ? 'show' : ''}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/genre">Genre</Link></li>
                        <li><Link to="/films">Films</Link></li>
                        <li><Link to="/series">Series</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default HeaderMovie;
