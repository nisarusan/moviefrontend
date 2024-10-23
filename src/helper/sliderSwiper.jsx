import {useRef, useState} from 'react';
import Movie1 from '../../src/assets/movie-1.png';
import PlusIcon from '../../src/assets/add-list.svg?react';
import EyeIcon from '../../src/assets/see-eye.svg?react';
import EyeSeen from '../../src/assets/eyes-seen.svg?react';
import Heart from '../../src/assets/heart.svg?react';
import './sliderSwiper.css';

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import {Navigation} from 'swiper/modules';
import {Link} from 'react-router-dom'; // Import Link from react-router-dom


export default function SliderSwiper(props) {
    const moviesMap = Array.isArray(props.data) ? props.data : [];
    4
    return (
        <>
            <Swiper navigation={true} slidesPerView={3} spaceBetween={120} modules={[Navigation]} breakpoints={{

                768: {
                    slidesPerView: 6,
                    spaceBetween: -20
                },
            }} className="mySwiper">
                {moviesMap.map(({title, releaseDate: release_date, imageUrl: poster_path, id}, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/movie/${id}`} className="movie-link">
                            <article className="movie-tiles">
                                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="movie"/>
                                <div className="movie-description">
                                    <h1>{title}</h1>
                                    <h1>{release_date.substring(0, 4)}</h1>
                                    <p>Rating: <span>Niet af nog</span></p>
                                </div>
                            </article>
                        </Link>
                        <div className="movie-add">
                                        <span className="movie-heart">
                                            <Heart/>
                                        </span>
                            <div className="movie-add--list">
                                    <span className="movie--add">
                                        <PlusIcon/>
                                    </span>
                                <span className="movie--see">
                                                <EyeSeen/>
                                    </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
