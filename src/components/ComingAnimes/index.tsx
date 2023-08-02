'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import 'swiper/css/effect-fade'
import {Autoplay} from "swiper/modules";
import SliderItem from "@/components/ComingAnimes/SliderItem";
import styles from './comingAnimes.module.scss'


export default function ComingAnimes(){
    return(
        <section>
            <Swiper className={styles.banner_wrapper}
                slidesPerView={1}
                autoplay={{
                    delay:2500
                }}
                modules={[Autoplay]}
                >
                <SwiperSlide>
                    <SliderItem url={'/assets/img/banner/comingAnimeMagicBattleSliderItem.jpg'}></SliderItem>

                </SwiperSlide>
                <SwiperSlide>
                    <SliderItem url={'/assets/img/banner/comingAnimeMagicBattleSliderItem.jpg'}></SliderItem>
                </SwiperSlide>
                <SwiperSlide>
                    <SliderItem url={'/assets/img/banner/comingAnimeMagicBattleSliderItem.jpg'}></SliderItem>
                </SwiperSlide>


            </Swiper>
        </section>
    )
}