import {useShakaPlayer} from "@limeplay/shaka-player";
import {usePlayback} from "@/lib/limeplay-core/dist";
import styles from './playbackControl.module.scss'
import {Pause, Play} from "react-feather";

export const PlaybackControl = () => {
    const {isPlaying, togglePlayback} = usePlayback()


    return (
        <div className={styles.playback_control}>
            <button onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying? <Pause size={24}/> : <Play size={24}/> }
            </button>
        </div>
    )
}