import {useLimeplay, usePlayback} from "@/lib/limeplay-core";
import styles from './playbackOnVideoControl.module.scss'
import {Play} from "react-feather";

export function PlaybackOnVideoControl() {
    const { togglePlayback} = usePlayback()
    const {playback} = useLimeplay()
    const isPlaying = !playback.paused
    return(
        <div className={styles.playback_control} onClick={togglePlayback}>
            {!isPlaying ? <Play size={48}/> : null}
        </div>
    )

}