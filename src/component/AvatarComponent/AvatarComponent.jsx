import React, { useRef, useEffect, useState } from 'react';
import avatarDefault from '../../assets/avatar.png';
import './AvatarComponent.css';

function AvatarComponent({ avatar, setAvatar, username }) {
    const fileInputRef = useRef(null);
    const downloadLinkRef = useRef(null); // Separate ref for download link
    const [downloadUrl, setDownloadUrl] = useState(null); // Store the download URL
    const token = localStorage.getItem('jwtToken');
    useEffect(() => {
        fetchAvatar(); // Fetch avatar when component mounts
    }, []);

    // Fetch the avatar when the component loads
    const fetchAvatar = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/images/download/${username}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); // trying old method fetch just learning
            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setAvatar(imageUrl); // Set the avatar from the blob
                setDownloadUrl(imageUrl); // Set download URL
            } else {
                console.error('Failed to fetch avatar');
                setAvatar(avatarDefault); // Fallback to default avatar
            }
        } catch (error) {
            console.error('Error fetching avatar:', error);
            setAvatar(avatarDefault); // Fallback to default avatar
        }
    };

    // Triggers the hidden input to upload a new avatar
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Handles when a new file is selected
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) handleAvatarUpload(file); // Directly upload the file
    };

    // Upload the selected avatar and update UI
    const handleAvatarUpload = async (file) => {
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPG and PNG formats are allowed');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);

        try {
            const response = await fetch('http://localhost:8080/api/images/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const imageUrl = URL.createObjectURL(file);
                setAvatar(imageUrl); // Use the file object to create an image URL
                setDownloadUrl(imageUrl); // Set the download URL
            } else {
                console.error('Failed to upload avatar');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    // Trigger download of the current avatar
    const handleAvatarDownload = () => {
        if (downloadUrl) {
            downloadLinkRef.current.click(); // Programmatically trigger the download
        }
    };

    return (
        <div className="profile-img">
            <img
                src={avatar || avatarDefault}
                alt="Avatar"
                className="profile-avatar"
                onClick={handleImageClick}
            />
            <div className="upload-overlay" onClick={handleImageClick}>
                Upload
            </div>
            {downloadUrl && (
                <div className="profile-img-download" onClick={handleAvatarDownload}>
                    Download avatar
                </div>
            )}


            {downloadUrl && (
                <a
                    href={downloadUrl}
                    download={`${username}-avatar.png`}
                    style={{ display: 'none' }}
                    ref={downloadLinkRef}
                >
                    Download
                </a>
            )}

            {/* Hidden input for file upload */}
            <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleAvatarChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default AvatarComponent;