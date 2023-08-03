'use client'
import styled from "styled-components";
import {inspect} from "util";
import styles from './comingAnimes.module.scss'
import {IBannerData} from "@/services/Anime";
import Link from "next/link";
import {Tags} from "@/components/Tags";
import Image from "next/image";



export default function SliderItem ({data}: {data: IBannerData}) {


    return (
        <div className={'container'}>
            <div className={styles.slider_item} style={{backgroundImage: `url(${data.image_banner})`}}>
                <div className={styles.anime_wrapper}>
                    <div className={styles.anime_info}>
                        <span className={styles.info_header}>НАЙОЧІКУВАНІШИЙ РЕЛІЗ СЕЗОНУ!</span>
                        <h1>{data.title}</h1>
                        <Tags tags={data.genre}/>
                        <h3>{data.studio}</h3>
                        <h3>{data.description}</h3>
                        <Link className={styles.info_header_watch_button} href={data.link}>Дивитися</Link>
                    </div>
                </div>
                <div className={styles.anime_wrapper_image_poster}>
                    <Image src={data.image} alt={data.title} width={300} height={430}/>
                </div>
            </div>
        </div>
    )
}