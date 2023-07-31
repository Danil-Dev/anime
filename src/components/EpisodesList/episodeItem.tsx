import {IEpisodeData} from "@/services/Anime";
import styles from './episodesList.module.scss'
import {Clock, Play} from "react-feather";

export const EpisodeItem = ({episode, handleChangeEpisode} : {episode: IEpisodeData, handleChangeEpisode: (number : number) => void}) => {

    const time = episode.duration.split(':')


    return (
        <li className={styles.episodes_wrapper_episode} onClick={() => {handleChangeEpisode(episode.episode_number)}}>
            <span className={styles.episodes_wrapper_episode_title}>
                <Play/>
                Episode {episode.episode_number} — {episode.title}
            </span>
            <span className={styles.episodes_wrapper_episode_duraction}>
                <Clock/>
                {time[1]} min {time[2]} s
            </span>
        </li>
    )
}