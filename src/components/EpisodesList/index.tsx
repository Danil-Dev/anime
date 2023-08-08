'use client'
import {ISeasonData} from "@/services/Anime";
import styles from './episodesList.module.scss'
import {EpisodeItem} from "@/components/EpisodesList/EpisodeItem";
import Scrollbar from "react-scrollbars-custom";
import {PlayCircle} from "react-feather";

export const EpisodesList = ({seasons, handleChangeEpisode}: {seasons : ISeasonData[], handleChangeEpisode: (number: number) => void}) => {
    console.log(seasons)
    return (
        <div className={styles.episodes}>
            <ul className={styles.episodes_wrapper}>
                <h2> <PlayCircle size={24}/> Episode List</h2>
                <Scrollbar noDefaultStyles style={{height: '350px'}}>

                    {seasons.map((season, index) => {
                        return (

                            <>
                                {season.episodes.map((episode, index) => (
                                    <EpisodeItem episode={episode} key={index} handleChangeEpisode={handleChangeEpisode} />
                                ))}

                                {season.episodes.map((episode, index) => (
                                    <EpisodeItem episode={episode} key={index} handleChangeEpisode={handleChangeEpisode} />
                                ))}
                                {season.episodes.map((episode, index) => (
                                    <EpisodeItem episode={episode} key={index} handleChangeEpisode={handleChangeEpisode} />
                                ))}
                                {season.episodes.map((episode, index) => (
                                    <EpisodeItem episode={episode} key={index} handleChangeEpisode={handleChangeEpisode} />
                                ))}

                            </>


                        )
                    })}
                </Scrollbar>

            </ul>
        </div>

    )
}
