'use client'
import {IAnimeData} from "@/services/Anime";
import {Swiper, SwiperSlide} from "swiper/react";
import {AnimeCard} from "@/components/AnimeCard";
import {Autoplay, FreeMode} from "swiper/modules";

import styles from './animeList.module.scss'


export default function AnimeListSlider({animeList}: {animeList: IAnimeData[]}) {

    return (
        <Swiper
            slidesPerView={5}


            modules={[Autoplay]}
            spaceBetween={15}
            autoplay={{
                delay: 1,
                // disableOnInteraction: false

            }}
            breakpoints={{
                320: {
                    slidesPerView: 2
                }
            }}
            speed={10000}
        >
            {animeList.map((anime, idx) => (
                <SwiperSlide className={styles.slide} key={idx}>
                    <AnimeCard anime={anime} width={300}/>
                </SwiperSlide>
            ))}



        </Swiper>

    )
}