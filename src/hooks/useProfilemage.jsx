import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthentication } from '../provider/AuthenticationProvider/AuthenticationProvider';

function useProfileImage() {

    const { username, userAuthorities } = useAuthentication();
    // const { user } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState(null);
    const [download, triggerDownload] = useState(false);


    useEffect(() => {
        async function getImage() {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`http://localhost:8080/image/${username.username}`, {
                    responseType: 'arraybuffer',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    }
                });
                const blob = new Blob([response.data], { type: 'image/png' });
                const dataUrl = URL.createObjectURL(blob);
                setProfileImage(dataUrl);
            } catch (error) {
                console.error(error);
            }
        }
        void getImage();
    }, [username.username, download]);

    return { profileImage };
}

export default useProfileImage;
