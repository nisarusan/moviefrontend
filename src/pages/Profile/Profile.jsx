import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import { useMovieContext } from '../../context/MovieContext.jsx';
import { jwtDecode } from 'jwt-decode';
import Avatar from '../../assets/avatar.png';

import './Profile.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TabProfileMenu from "../../component/TabProfileMenu/TabProfileMenu.jsx";
import ProfileFavorite from "../../component/ProfileFavorite/ProfileFavorite.jsx";
function Profile() {
    const { isLoggedIn } = useAuthentication();
    const { username } = useAuthentication();
    const { userAuthorities } = useAuthentication();

    return (
        <>
            <div className="wrapper">
                <section className="profile">
                    <profile className="profile-wrapper">
                        <img src={Avatar} alt="Avatar" />
                        <div className="profile-name">
                            <h1>{username}</h1>
                            <p>{userAuthorities}</p>
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
                    <TabProfileMenu />
                        <div className="weather-content">
                            <div className="tab-wrapper">
                                <Routes>
                                    <Route path="/favorite" element={  <ProfileFavorite />}>
                                        {/*<ForecastTab coordinates={weatherData.coord}/>*/}
                                    </Route>
                                    <Route path="/" exact>
                                        {/*<TodayTab coordinates={weatherData.coord}/>*/}
                                    </Route>
                                </Routes>
                            </div>
                        </div>
                </section>
            </div>
        </>
    );
}

export default Profile;
