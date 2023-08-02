'use client'
import styles from './singleAnime.module.scss'
import {IAnimeData} from "@/services/Anime";
import {useState} from "react";
import {VideoPlayer} from "@/components/Player";
import {EpisodesList} from "@/components/EpisodesList";

export const EpisodeArea = ({anime} : {anime : IAnimeData}) => {

    const [currentEpisode, setCurrentEpisode] = useState<number>(0)
    const [currentSeason, setCurrentSeason] =  useState<number>(0)
    const handleChangeEpisode = ( number : number) => {
        console.log('Change episode to ', number)
        setCurrentEpisode(number)
        console.log(currentEpisode, anime.seasons[currentSeason].episodes[currentEpisode])
    }
    return(
        <section className={styles.single_anime_episodes}>
            <div className="container">
                <div className="row">
                    <div className={styles.single_anime_episodes_wrapper}>
                        <VideoPlayer episode={anime.seasons[currentSeason].episodes[currentEpisode]}/>
                        <EpisodesList seasons={anime.seasons} handleChangeEpisode={handleChangeEpisode}/>
                    </div>
                </div>
            </div>
        </section>
    )
}