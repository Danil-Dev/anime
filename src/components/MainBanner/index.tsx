'use client'

import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css'
import 'swiper/css/effect-fade'
import SliderItem from "@/components/MainBanner/SliderItem";
import {Autoplay, EffectFade} from "swiper/modules";
import styles from './mainBanner.module.scss'


export default function MainBanner () {


    return (
        <section className={styles.banner_wrapper}>
            <Swiper
                // onSwiper={(swiper) => (window.swiper = swiper)}
                slidesPerView={1}
                effect={'fade'}
                autoplay={{
                    delay: 2500,
                    // disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}

            >
                <SwiperSlide>
                    <SliderItem url={'/assets/img/banner/banner_bg01.jpg'}></SliderItem>
                </SwiperSlide>
                <SwiperSlide>
                    <SliderItem url={'/assets/img/banner/1.png'}></SliderItem>
                </SwiperSlide>
                <SwiperSlide>
                    <SliderItem url={'/assets/img/banner/2.png'}></SliderItem>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}