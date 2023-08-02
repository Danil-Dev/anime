'use client'
import styled from "styled-components";
import {inspect} from "util";
import styles from './comingAnimes.module.scss'



export default function SliderItem ({url}: {url: string}) {


    return (
        <div className={styles.slider_item} style={{backgroundImage: `url(${url})`}}>
            <div className={styles.anime_wrapper}>
                <div className={styles.anime_info}>
                    <h2>НАЙОЧІКУВАНІШИЙ РЕЛІЗ СЕЗОНУ!</h2>
                    <h1>Магічна битва (2 сезон)</h1>
                    <div className={styles.tags}>
                        <span>Бойовик</span>
                        <span>Драма</span>
                        <span>Надприродне</span>
                    </div>
                    <h3>Студія:
                        MAPPA</h3>
                    <h3>ОПИСАНИЕ ОЧЕНЬ МНОГА ТЕКСТА ВОТ</h3>
                </div>
                <div className={styles.anime_banner} style={{backgroundImage:`url(assets/img/jujutsuKaisenInfoBanner.png)`}}>

                </div>
            </div>
        </div>
    )
}