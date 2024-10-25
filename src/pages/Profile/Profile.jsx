import React, { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddMovieComponent from '../../component/AddMovieComponent/AddMovieComponent.jsx';
import ProfileFavorite from '../../component/ProfileFavorite/ProfileFavorite.jsx';
import ProfileRated from '../../component/ProfileRated/ProfileRated.jsx';
import ProfileSeen from '../../component/ProfileSeen/ProfileSeen.jsx';
import TabProfileMenu from '../../component/TabProfileMenu/TabProfileMenu.jsx';
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import './Profile.css';
import { AvatarContext } from "../../context/AvatarContext.jsx";
import AvatarComponent from "../../component/AvatarComponent/AvatarComponent.jsx";

function Profile() {
    const { username, userAuthorities } = useAuthentication();
    const [showAddMovie, setShowAddMovie] = useState(false);
    const { avatar, setAvatar } = useContext(AvatarContext); // Avatar uit de context

    const tabs = [
        { title: 'Beoordeelde films', component: <ProfileRated /> },
        { title: 'Favorite', component: <ProfileFavorite /> },
        { title: 'Gezien', component: <ProfileSeen /> },
    ];

    const handleAddMovieClick = () => {
        setShowAddMovie(!showAddMovie);
    };

    return (
        <div className="wrapper">
            <section className="profile-section">
                <div className="profile-wrapper">
                    <div className="profile-status">
                        <AvatarComponent avatar={avatar} setAvatar={setAvatar} username={username} />
                    </div>

                    <div className="profile-name">
                        <h1>{username}</h1>
                        <p>{userAuthorities}</p>
                    </div>
                </div>
                {userAuthorities == "ADMIN" && (
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