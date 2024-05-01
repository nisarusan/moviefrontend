import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import { useMovieContext } from '../../context/MovieContext.jsx';
import { jwtDecode } from 'jwt-decode';
import Avatar from '../../assets/avatar.png';
function Profile() {
    const { isLoggedIn } = useAuthentication();
    const { username } = useAuthentication();

    return (
        <>
            <div className="wrapper">
                <section className="profile">
                    <profile className="profile-wrapper">
                        <img src={<Avatar/>} alt="Avatar" />
                        <div className="profile-name">
                            <h1>{username}</h1>
                            <p>Gebruiker</p>
                        </div>
                    </profile>
                </section>
                <section className="user">
                    <div className="user-menu">
                        <ul>
                            <li>Favorieten</li>
                            <li>Gezien</li>
                            <li>Beoordeeld</li>
                            <li>Lijst</li>
                            <li>Profiel</li>
                        </ul>
                    </div>
                    <div className="user-see">
                    </div>
                </section>
            </div>
        </>
    );
}

export default Profile;
