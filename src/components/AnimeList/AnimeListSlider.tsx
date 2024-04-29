'use client'
import {IAnimeData} from "@/services/Anime";
import {Swiper, SwiperSlide} from "swiper/react";
import {AnimeCard} from "@/components/AnimeCard";
import {Autoplay, FreeMode} from "swiper/modules";

import styles from './animeList.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function AnimeListSlider({animeList}: {animeList: IAnimeData[]}) {

    return (
        <Swiper
            slidesPerView={5}
            // slidesPerGroup={3}

            modules={[Autoplay]}
            spaceBetween={15}
            autoplay={{
                delay: 1000,
                // disableOnInteraction: false

            }}
            breakpoints={{
                320: {
                    slidesPerView: 2
                },
                780: {
                    slidesPerView: 5
                }
            }}
            // loop={true}
            speed={5000}
        >
            {animeList.map((anime, idx) => (
                <SwiperSlide style={{width: '300px'}} key={idx}>
                    <AnimeCard anime={anime} width={300}/>
                </SwiperSlide>
            ))}



        </Swiper>

    )
}