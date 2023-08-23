'use client'
import styles from './mainBanner.module.scss'



export default function SliderItem ({url}: {url: string}) {


    return (
        <div className={styles.slider_item} style={{backgroundImage: `url(${url})`}}>
        </div>
    )
}