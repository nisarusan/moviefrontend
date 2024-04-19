import { useRef, useState } from 'react';
import Movie1 from '../../src/assets/movie-1.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

export default function SliderSwiper(props) {
    const moviesMap = Array.isArray(props.data) ? props.data : [];4
    return (
        <>
            <Swiper navigation={true} slidesPerView={3}   spaceBetween={120} modules={[Navigation]} breakpoints={{
                768: {
                    slidesPerView: 6,
                    spaceBetween: 0
                },
            }} className="mySwiper" >
                {moviesMap.map(({title, releaseDate: release_date, imageUrl: poster_path}, index) => (
                <SwiperSlide  key={index}>
                    <article className="movie-tiles">
                                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="movie"/>
                                <div className="movie-description">
                                    <h1>{title}</h1>
                                    <h1>{release_date.substring(0, 4)}</h1>
                                    <p>Rating: <span>7.4</span></p>
                                    <div className="movie-add">
                                        <span className="movie-heart"></span>
                                        <div className="movie-add--list">
                                    <span className="movie--add">
                                    </span>
                                            <span className="movie--see">
                                    </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                </SwiperSlide>
                    ))}
            </Swiper>
        </>
    );
}
