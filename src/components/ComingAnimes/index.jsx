'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay } from "swiper/modules";
import SliderItem from "@/components/ComingAnimes/SliderItem";
import styles from './comingAnimes.module.scss';
import { Box } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
export default function ComingAnimes({ banners }) {
    return (<Box p={'80px 0'}>
            <Container maxW={'container.xl'}>
                <Swiper className={styles.banner_wrapper} slidesPerView={1} speed={2500} 
    // autoplay={{
    //     disableOnInteraction: false,
    //     delay:2500
    // }}
    modules={[Autoplay]}>
                    {banners.map((banner, index) => (<SwiperSlide key={index}>
                            <SliderItem data={banner}/>
                        </SwiperSlide>))}



                </Swiper>
            </Container>
        </Box>);
}
