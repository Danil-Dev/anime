'use client'
import styled from "styled-components";
import {inspect} from "util";
import styles from './mainBanner.module.scss'



export default function SliderItem ({url}: {url: string}) {


    return (
        <div className={styles.slider_item} style={{backgroundImage: `url(${url})`}}>
        </div>
    )
}