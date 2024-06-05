import React, {useState} from 'react';
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import Avatar from '../../assets/avatar.png';

import './Profile.css';
import { Routes, Route, useLocation } from "react-router-dom";
import TabProfileMenu from "../../component/TabProfileMenu/TabProfileMenu.jsx";
import ProfileFavorite from "../../component/ProfileFavorite/ProfileFavorite.jsx";
import ProfileSeen from "../../component/ProfileSeen/ProfileSeen.jsx";
import ProfileRated from "../../component/ProfileRated/ProfileRated.jsx";

function Profile() {
    const { username, userAuthorities } = useAuthentication();


    //Tabs Profielpagina
    const tabs = [
        { title: 'Rated', component: <ProfileRated /> },
        { title: 'Favorite', component: <ProfileFavorite /> },
        { title: 'Seen', component: <ProfileSeen/> },
    ];

    return (
        <div className="wrapper">
            <section className="profile-section">
                <div className="profile-wrapper">
                    <img src={Avatar} alt="Avatar"/>
                    <div className="profile-name">
                        <h1>{username}</h1>
                        <p>{userAuthorities}</p>
                    </div>
                </div>
                {userAuthorities == 'ADMIN' && (
                    <div className="profiel-movie--add">
                        Voeg nieuwe films toe
                    </div>
                )}
            </section>
            <section className="user">
                {/*<div className="user-menu">*/}
                {/*</div>*/}
                {/*<div className="user-see">*/}
                {/*</div>*/}
                <div className="tab-wrapper">
                    {/*// Tabs doorgeven naar TabProfileMenu component */}
                    <TabProfileMenu tabs={tabs} />
                </div>
            </section>
        </div>
    );
}

export default Profile;
