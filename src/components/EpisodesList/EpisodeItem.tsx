import {IEpisodeData} from "@/services/Anime";
import styles from './episodesList.module.scss'
import Image from "next/image";


export const EpisodeItem = ({episode, handleChangeEpisode} : {episode: IEpisodeData, handleChangeEpisode: (number : number) => void}) => {

    const time = episode.duration.split(':')


    return (
        <li className={styles.episodes_wrapper_episode} onClick={() => {handleChangeEpisode(episode.episode_number)}}>
            <div className={styles.episodes_wrapper_episode_thumb}>

                <Image src={episode.image_thumb} alt={episode.title} width={160} height={90}/>

            </div>
            <div className={styles.episodes_wrapper_episode_info}>
                <h3>Episode {episode.episode_number}</h3>
                <p>{episode.title}</p>
            </div>
        </li>
    )
}