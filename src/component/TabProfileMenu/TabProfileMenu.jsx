import React from 'react';
import { NavLink } from 'react-router-dom';
import './TabProfileMenu.css';

function TabProfileMenu() {
    return (
        <nav className="tab-bar">
            <ul>
                <li>
                    <NavLink className={({ isActive }) => isActive && 'active'} to="/">
                        Vandaag
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive && 'active'} to="/favorite">
                        Komende week
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default TabProfileMenu;