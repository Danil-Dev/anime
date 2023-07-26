import {IAnimeData, IAnimeList, IAnimeSingle} from "@/services/Anime";

import Link from "next/link";
import Image from "next/image";
import {FC} from "react";
import styles from './animeCard.module.scss'

export const AnimeCard: FC<IAnimeSingle> = ({anime}) => {

    const short_title = anime.title.length > 20 ? anime.title.substring(0, 20) + '...' : anime.title

    return (
        <div className={'col-md-3  col-sm-6'}>
            <div className={styles.anime_card}>
                <div className={styles.anime_card_poster}>
                    <Link href={'#'}>
                        <Image src={anime.image} alt={anime.title} width={300} height={430}/>
                    </Link>
                </div>
                <div className={styles.anime_card_content}>
                    <h2>{short_title}</h2>
                </div>
            </div>
         </div>
    )
}