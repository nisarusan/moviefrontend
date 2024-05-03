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

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Assuming you have loading state

    const handleLogout = () => {
        // Perform logout actions here (e.g., clear authentication state)
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken'); // Clear token from localStorage
        // Additional cleanup tasks if needed
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
            <MovieProvider>
                <LocationProvider>
                    <Router>
                        <HeaderMovie isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
                        {isLoggedIn && <SearchComp/>}
                        {isLoading ? (
                            <div style={{textAlign: 'center', padding: '20px'}}>
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <Routes>
                                <Route path="/" element={isLoggedIn ? <TilesCards/> : <HomePage/>}/>
                                <Route path="/movies" element={isLoggedIn ? <TilesCards/> : <HomePage/>}/>
                                <Route path="/movies" element={isLoggedIn ? <Register/> : <HomePage/>}/>
                                <Route path="/login" element={isLoggedIn ? <Login/> : <Login/>}/>
                                <Route path="/profile" element={isLoggedIn ? <Profile/> : <Login/>}/>
                                <Route path="/movie/:id" element={isLoggedIn ? <MovieDetailContainer/> : <HomePage/>}/>
                                <Route path="/favorite" element={isLoggedIn ? <ProfileFavorite/> : <HomePage/>}/>
                                <Route path="/seen" element={isLoggedIn ? <ProfileSeen/> : <HomePage/>}/>
                            </Routes>
                        )}
                        <FooterComponent/>
                    </Router>
                </LocationProvider>
            </MovieProvider>
        </AuthenticationProvider>
    );
}

export default App;