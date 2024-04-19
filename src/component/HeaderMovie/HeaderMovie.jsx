import movieLogo from '../../assets/movieflix_logo.svg';
import './HeaderMovie.css';

function HeaderMovie() {
    return (
        <>
            <header>
                <div className="header-wrapper">
                    <div>
                        <img src={movieLogo} alt=""/>
                    </div>

                    <nav>
                        <input id="menu-toggle" type="checkbox"/>
                        <label className='menu-button-container' htmlFor="menu-toggle">
                            <div className='menu-button'></div>
                        </label>
                        <ul className="menu">
                            <li>Home</li>
                            <li>Genre</li>
                            <li>Films</li>
                            <li>Serie</li>
                        </ul>
                        {/*<ul className="nav-profile">*/}
                        {/*    <p>Login</p>*/}
                        {/*    <span className="icon"></span>*/}
                        {/*</ul>*/}
                    </nav>
                </div>
            </header>
        </>
    )


}

export default HeaderMovie;