'use client'
import {IAnimeData} from "@/services/Anime";
import styles from './catalogArea.module.scss'
import {AnimeCard} from "@/components/AnimeCard";

interface CatalogItemsProps{
    animeList: IAnimeData[]
}

export default function CatalogItems({animeList}: CatalogItemsProps) {

    return (
        <>

            {animeList.length >=1 && (
                <div className={styles.catalog}>
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} width={200}/>
                    ))}
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} width={200}/>
                    ))}
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} width={200}/>
                    ))}
                </div>
            )}
        </>
    )

}