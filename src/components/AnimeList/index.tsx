import {FC} from"react";
import {IAnimeList} from "@/services/Anime";
import {AnimeCard} from "@/components/AnimeCard";
import styles from './animeList.module.scss'

export const AnimeList: FC<IAnimeList> = ({all_anime, title}) => {



    return(
        <section className={styles.anime_list}>
            <div className={styles.anime_list_shape}></div>
            <div className="container">
                <h1>{title}</h1>
                <div className="row">
                    {all_anime.length ? all_anime.map((anime, key )=> (
                        <AnimeCard key={key} anime={anime}/>
                    )) : <div>Anime not found</div>}
                </div>

            </div>

        </section>
    )
}