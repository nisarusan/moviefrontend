import movieLogo from '../../assets/movieflix_logo.svg';
import './FooterComponent.css';

function FooterComponent() {
    return (
        <>
            <footer>
                <div className="footer-wrapper">
                    <img src={movieLogo} alt="MovieLogo"/>
                    <p>Deze MovieFlix applicatie is ontwikkeld door Nizar Abak</p>
                </div>
            </footer>
        </>
    )
}

export default FooterComponent;