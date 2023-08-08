import {useShakaPlayer} from "@limeplay/shaka-player";
import {useLimeplay, usePlayback} from "@/lib/limeplay-core/";
import styles from './playbackControl.module.scss'
import {Pause, Play} from "react-feather";

export const PlaybackControl = () => {
    const { togglePlayback} = usePlayback()
    const {playback} = useLimeplay()

    const isPlay = !playback.paused



    return (
        <div className={styles.playback_control}>
            <button onClick={togglePlayback} aria-label={isPlay ? 'Pause' : 'Play'}>
                {isPlay? <Pause size={24}/> : <Play size={24}/> }
            </button>
        </div>
    )
}