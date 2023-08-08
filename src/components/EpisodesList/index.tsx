import {IEpisodeData} from "@/services/Anime";
import styles from './episodesList.module.scss'
import {EpisodeItem} from "@/components/EpisodesList/EpisodeItem";
import Scrollbar from "react-scrollbars-custom";
import {PlayCircle} from "react-feather";

interface EpisodesListProps {
    episodes: IEpisodeData[],
    handleChangeEpisode: (number: number) => void
}

export const EpisodesList = ({episodes, handleChangeEpisode}: EpisodesListProps) => {
    return (
        <div className={styles.episodes}>
            <ul className={styles.episodes_wrapper}>
                <h2><PlayCircle size={24}/> Episode List</h2>
                <Scrollbar noDefaultStyles style={{height: '350px'}}>
                    {episodes.map((episode, index) => (
                        <>
                            <EpisodeItem episode={episode} handleChangeEpisode={handleChangeEpisode}/>\
                        </>
                    ))}
                </Scrollbar>

            </ul>
        </div>

    )
}
