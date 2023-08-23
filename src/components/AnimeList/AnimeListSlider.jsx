'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimeCard } from "@/components/AnimeCard";
import { Autoplay, FreeMode } from "swiper/modules";
import styles from './animeList.module.scss';
export default function AnimeListSlider({ animeList }) {
    return (<Swiper slidesPerView={'auto'} freeMode={true} modules={[FreeMode, Autoplay]} spaceBetween={15} autoplay={{
            delay: 1,
            disableOnInteraction: false
        }} loop={true} speed={10000}>
            {animeList.map((anime, idx) => (<SwiperSlide className={styles.slide} key={idx}>
                    <AnimeCard anime={anime} width={300}/>
                </SwiperSlide>))}
            {animeList.map((anime, idx) => (<SwiperSlide className={styles.slide} key={idx}>
                    <AnimeCard anime={anime} width={300}/>
                </SwiperSlide>))}


            {animeList.map((anime, idx) => (<SwiperSlide className={styles.slide} key={idx}>
                    <AnimeCard anime={anime} width={300}/>
                </SwiperSlide>))}
            {animeList.map((anime, idx) => (<SwiperSlide className={styles.slide} key={idx}>
                    <AnimeCard anime={anime} width={300}/>
                </SwiperSlide>))}


        </Swiper>);
}
