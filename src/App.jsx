import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import HeaderMovie from './component/HeaderMovie/HeaderMovie.jsx';
import FooterComponent from './component/FooterComponent/FooterComponent.jsx';
import SearchComp from './component/SearchComp/SearchComp.jsx';
import MovieDetailContainer from './component/MovieDetailContainer/MovieDetailContainer.jsx';
import {MovieProvider} from './context/MovieContext.jsx';
import TilesCards from './component/TilesCards/TilesCards.jsx';
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import {AuthenticationProvider} from "./provider/AuthenticationProvider/AuthenticationProvider.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import {LocationProvider} from './provider/LocationProvider/LocationProvider.jsx';
import ProfileFavorite from "./component/ProfileFavorite/ProfileFavorite.jsx";
import ProfileSeen from "./component/ProfileSeen/ProfileSeen.jsx";
import ProfileRated from "./component/ProfileRated/ProfileRated.jsx";
import ErrorComponent from "./component/ErrorComponent/ErrorComponent.jsx";
import {AvatarProvider} from "./context/AvatarContext.jsx";
import {FavoritesProvider} from "./context/FavoriteContext.jsx";
import MovieRecommendations from "./component/MovieRecommendations/MovieRecommendations.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Assuming you have loading state


    // Commenting in English and Dutch... mixed up.
    // For now I will leave it Dutch and English commenting
    const handleLogout = () => {
        // Perform logout actions here (e.g., clear authentication state)
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken'); // Clear token from localStorage
    };

    useEffect(() => {
        // Check if JWT token exists in local storage
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthenticationProvider>
            <AvatarProvider>
                <MovieProvider>
                    <LocationProvider>
                        <FavoritesProvider>
                            <Router>
                                <HeaderMovie isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
                                {isLoggedIn && <SearchComp/>}
                                {isLoading ? (
                                    <div style={{textAlign: 'center', padding: '20px'}}>
                                        <p>Even geduld is aan het laden...</p>
                                    </div>
                                ) : (
                                    <Routes>
                                        <Route path="/" element={isLoggedIn ? <TilesCards/> : <HomePage/>}/>
                                        <Route path="/movies" element={isLoggedIn ? <TilesCards/> : <HomePage/>}/>
                                        <Route path="/movies" element={isLoggedIn ? <Register/> : <HomePage/>}/>
                                        <Route path="/login" element={isLoggedIn ? <Profile/> : <Login/>}/>
                                        <Route path="/register" element={isLoggedIn ? <Profile/> : <Register/>}/>
                                        <Route path="/profile/*" element={isLoggedIn ? <Profile/> : <Login/>}/>
                                        <Route path="/recommend" element={isLoggedIn ? <MovieRecommendations/> : <Login/>}/>
                                        <Route path="/movie/:id"
                                               element={isLoggedIn ? <MovieDetailContainer/> : <HomePage/>}/>
                                        {/*404 pagina eronder*/}
                                        <Route element={<ErrorComponent/>}/>
                                        {/*<Route path="/favorite" element={isLoggedIn ? <ProfileFavorite/> : <HomePage/>}/>*/}
                                        {/*<Route path="/seen" element={isLoggedIn ? <ProfileSeen/> : <HomePage/>}/>*/}
                                        {/*<Route path="/rated" element={isLoggedIn ? <ProfileRated /> : <HomePage/>}/>*/}
                                    </Routes>
                                )}
                                <FooterComponent/>
                            </Router>
                        </FavoritesProvider>
                    </LocationProvider>
                </MovieProvider>
            </AvatarProvider>
        </AuthenticationProvider>
    );
}

export default App;