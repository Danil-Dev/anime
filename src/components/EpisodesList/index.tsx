'use client'
import {ISeasonData} from "@/services/Anime";
import styles from './episodesList.module.scss'
import {EpisodeItem} from "@/components/EpisodesList/episodeItem";

export const EpisodesList = ({seasons, handleChangeEpisode}: {seasons : ISeasonData[], handleChangeEpisode: (number: number) => void}) => {
    console.log(seasons)
    return (
        <div className={styles.episodes}>
            <h1>Seasons List Component</h1>
            {seasons.map((season, index) => {
                return (
                    <div key={index}>

                        <ul className={styles.episodes_wrapper}>
                            <h1>Season {season.season_number}</h1>
                            {season.episodes.map((episode, index) => (
                                <EpisodeItem episode={episode} key={index} handleChangeEpisode={handleChangeEpisode}/>
                            ))}
                        </ul>
                    </div>

                )
            })}
        </div>

    )
}
