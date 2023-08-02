import {PlaybackControl} from "@/components/Player/Controls/PlaybackControl";
import styles from './controlsOverlay.module.scss'
import {TimelineControl} from "@/components/Player/Controls/TimelineControl";
import {TimeControl} from "@/components/Player/Controls/TimeControl";
import {VolumeControl} from "@/components/Player/Controls/VolumeControl";
import {FullscreenControl} from "@/components/Player/Controls/FullscreenControl";

export const ControlsOverlay = () => {

    return(
        <div className={styles.player_overlay}>
            <TimelineControl/>
            <div className={styles.player_controls}>
                <div>
                    <PlaybackControl/>
                    <VolumeControl/>
                    <TimeControl/>
                </div>
                <div>
                    <FullscreenControl/>
                </div>

            </div>
        </div>


    )
}