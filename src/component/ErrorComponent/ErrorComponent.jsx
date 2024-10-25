import './ErrorComponent.css';
import errorImage from '../../assets/error404.svg';
import HomePage from "../../pages/HomePage/HomePage.jsx";
import {Link} from "react-router-dom";
function ErrorComponent() {
    return (
        <>
            <section className="error">
                <div className="error-wrapper">
                    <div className="error-img">
                        <img src={errorImage} alt="Error 404"/>
                    </div>
                    <div className="error-intro">
                        <h1 className="error-title">
                            Deze pagina kan niet gevonden worden
                        </h1>
                        <p>
                            Je kan hier blijven chillen of weggaan!
                        </p>
                        <button type="button" className="error-button">
                            <Link to="/">Ga terug</Link>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ErrorComponent;