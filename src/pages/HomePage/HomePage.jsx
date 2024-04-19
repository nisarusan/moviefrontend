import HeaderMovie from "../../component/HeaderMovie/HeaderMovie.jsx";
import FooterComponent from '../../component/FooterComponent/FooterComponent.jsx';
import './HomePage.css';

function HomePage() {

    return (
        <>
            <section className="intro">
                <div className="intro-wrapper">
                    <h1 className="intro-title">Jouw streaming gids voor films en tv shows!</h1>
                    <p className="intro-description">
                        Vind waar je kan streamen naar nieuwe populaire en entertainment films en serie met MovieFlix
                    </p>
                    <button className="intro-button">
                        Ontdek films en series
                    </button>
                    <p className="intro-end">Streaming service op MovieFlix</p>
                </div>
            </section>
        </>

    )
}

export default HomePage;