import styles from './episodesList.module.scss';
import { EpisodeItem } from "@/components/EpisodesList/EpisodeItem";
import Scrollbar from "react-scrollbars-custom";
import { PlayCircle } from "react-feather";
export const EpisodesList = ({ episodes, handleChangeEpisode }) => {
    return (<div className={styles.episodes}>
            <ul className={styles.episodes_wrapper}>
                <h2><PlayCircle size={24}/> Episode List</h2>
                <Scrollbar noDefaultStyles style={{ height: '350px' }}>
                    {episodes.map((episode, index) => (<>
                            <EpisodeItem episode={episode} handleChangeEpisode={handleChangeEpisode}/>\
                        </>))}
                </Scrollbar>

            </ul>
        </div>);
};
