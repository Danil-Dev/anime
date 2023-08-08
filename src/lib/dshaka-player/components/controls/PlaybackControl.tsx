import styles from './controls.module.scss'
import {Pause, Play} from "react-feather";
import {usePlayback} from "@/lib/dshaka-player/hooks/usePlayback";

export function PlaybackControl () {
    const {isPlaying, togglePlayback} = usePlayback()

    return (
        <>
            <div className={styles.control_playback}>
                <button onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying? <Pause size={24}/> : <Play size={24}/> }
                </button>
            </div>
        </>

    )
}