import React, {useEffect, useState, useRef, useContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import avatarDefault from '../../assets/avatar.png';
import AddMovieComponent from '../../component/AddMovieComponent/AddMovieComponent.jsx';
import ProfileFavorite from '../../component/ProfileFavorite/ProfileFavorite.jsx';
import ProfileRated from '../../component/ProfileRated/ProfileRated.jsx';
import ProfileSeen from '../../component/ProfileSeen/ProfileSeen.jsx';
import TabProfileMenu from '../../component/TabProfileMenu/TabProfileMenu.jsx';
import { useAuthentication } from '../../provider/AuthenticationProvider/AuthenticationProvider.jsx';
import './Profile.css';
import {AvatarContext} from "../../context/AvatarContext.jsx";

function Profile() {
    const { username, userAuthorities } = useAuthentication();
    const [showAddMovie, setShowAddMovie] = useState(false);
    const { avatar, setAvatar } = useContext(AvatarContext); // Haal avatar en setAvatar uit de context
    const [avatarBlob, setAvatarBlob] = useState(null);
    const fileInputRef = useRef(null); // Reference for the hidden file input

    // Tabs Profielpagina
    const tabs = [
        { title: 'Rated', component: <ProfileRated /> },
        { title: 'Favorite', component: <ProfileFavorite /> },
        { title: 'Seen', component: <ProfileSeen /> },
    ];

    useEffect(() => {
        // Fetch the current avatar
        fetchAvatar();
    }, []);

    const fetchAvatar = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/images/download/${username}`);
            if (response.ok) {
                const blob = await response.blob();
                setAvatarBlob(blob);
                setAvatar(URL.createObjectURL(blob));
            } else {
                console.error('Failed to fetch avatar');
                setAvatar(avatarDefault); // Fall back op default avatar
            }
        } catch (error) {
            console.error('Error fetching avatar:', error);
            setAvatar(avatarDefault); // Fallback op default avatar
        }
    };

    const handleAddMovieClick = () => {
        setShowAddMovie(!showAddMovie);
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleAvatarUpload(file); // Upload het bestand direct
        }
    };

    const handleAvatarUpload = async (file) => {
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Alleen JPG en PNG is toegestaan');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);

        try {
            console.log("Uploading avatar...");
            const response = await fetch('http://localhost:8080/api/images/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                fetchAvatar(); // Oke update de avatar
            } else {
                const errorText = await response.text();
                console.error('Failed to upload avatar:', errorText);
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    const handleAvatarDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/images/delete/${username}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setAvatar(avatarDefault);
                setAvatarBlob(null);
                console.log('Avatar deleted successfully');
            } else {
                console.error('Failed to delete avatar');
            }
        } catch (error) {
            console.error('Error deleting avatar:', error);
        }
    };

    const handleAvatarDownload = () => {
        if (!avatarBlob) return;

        const url = window.URL.createObjectURL(new Blob([avatarBlob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${username}-avatar.png`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger de geheime button
    };

    return (
        <div className="wrapper">
            <section className="profile-section">
                <div className="profile-wrapper">
                    <div className="profile-status">
                        <div className="profile-img">
                            <img
                                src={avatar}
                                className="profile-avatar"
                                alt="Avatar"
                                onClick={handleImageClick} // Maak het klikbaar
                            />
                            <div className="upload-overlay" onClick={handleImageClick}>
                                Upload
                            </div>
                        </div>
                        <div className="profile-img-download" onClick={handleAvatarDownload}>
                            Download avatar
                        </div>
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
                <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleAvatarChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }} // Hide the file input
                />

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