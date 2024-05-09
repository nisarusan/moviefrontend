import HeaderMovie from "../../component/HeaderMovie/HeaderMovie.jsx";
import FooterComponent from '../../component/FooterComponent/FooterComponent.jsx';
import './HomePage.css';
import {Link} from "react-router-dom";

function HomePage() {

    return (
        <>
            <section className="intro">
                <div className="intro-wrapper">
                    <h1 className="intro-title">Jouw streaming gids voor films en tv shows!</h1>
                    <p className="intro-description">
                        Vind waar je kan streamen naar nieuwe populaire en entertainment films en serie met MovieFlix
                    </p>
                    <Link to="/login" className="intro-button">
                        Ontdek films en series
                    </Link>
                    <p className="intro-end">Streaming service op MovieFlix</p>
                </div>
            </section>
        </>

    )
}

export default HomePage;