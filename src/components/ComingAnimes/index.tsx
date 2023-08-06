'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import 'swiper/css/effect-fade'
import {Autoplay} from "swiper/modules";
import SliderItem from "@/components/ComingAnimes/SliderItem";
import styles from './comingAnimes.module.scss'
import {IBannerData} from "@/services/Anime";


export default function ComingAnimes({banners}: {banners: IBannerData[]}){
    return(
        <section>
            <Swiper className={styles.banner_wrapper}
                slidesPerView={1}
                autoplay={{
                    delay:2500
                }}
                modules={[Autoplay]}
                >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <SliderItem data={banner}/>
                    </SwiperSlide>
                ))}



            </Swiper>
        </section>
    )
}