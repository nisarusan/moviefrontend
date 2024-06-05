import React, { useState } from 'react';
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import Avatar from '../../assets/avatar.png';

import './Profile.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import TabProfileMenu from '../../component/TabProfileMenu/TabProfileMenu.jsx';
import ProfileFavorite from '../../component/ProfileFavorite/ProfileFavorite.jsx';
import ProfileSeen from '../../component/ProfileSeen/ProfileSeen.jsx';
import ProfileRated from '../../component/ProfileRated/ProfileRated.jsx';
import AddMovieComponent from '../../component/AddMovieComponent/AddMovieComponent.jsx';

function Profile() {
    const { username, userAuthorities } = useAuthentication();
    const [showAddMovie, setShowAddMovie] = useState(false);

    //Tabs Profielpagina
    const tabs = [
        { title: 'Rated', component: <ProfileRated /> },
        { title: 'Favorite', component: <ProfileFavorite /> },
        { title: 'Seen', component: <ProfileSeen /> },
    ];

    const handleAddMovieClick = () => {
        // Toggle the state to show/hide the AddMovieComponent
        setShowAddMovie(!showAddMovie);
    };

    return (
        <div className="wrapper">
            <section className="profile-section">
                <div className="profile-wrapper">
                    <img src={Avatar} alt="Avatar" />
                    <div className="profile-name">
                        <h1>{username}</h1>
                        <p>{userAuthorities}</p>
                    </div>
                </div>
                {userAuthorities == 'ADMIN' && (
                    <div className="profiel-movie--add" onClick={handleAddMovieClick}>
                        Voeg nieuwe films toe
                    </div>
                )}
            </section>
            <section className="user">
                {showAddMovie ? <AddMovieComponent /> : (
                    <div className="tab-wrapper">
                        <Routes>
                            <Route path="/" element={<TabProfileMenu tabs={tabs} />} />
                        </Routes>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Profile;
