import {PlaybackControl} from "@/components/Player/Controls/PlaybackControl";
import styles from './controlsOverlay.module.scss'
import {TimelineControl} from "@/components/Player/Controls/TimelineControl";
import {TimeControl} from "@/components/Player/Controls/TimeControl";
import {VolumeControl} from "@/components/Player/Controls/VolumeControl";
import {FullscreenControl} from "@/components/Player/Controls/FullscreenControl";
import {SettingsControl} from "@/components/Player/Controls/SettingsControl";
import {PlaybackOnVideoControl} from "@/components/Player/Controls/PlaybackOnVideoControl";
import {useState} from "react";
import {LayoutControl} from "@/components/Player/Controls/LayoutControl";

export const ControlsOverlay = () => {
    const [isHiddenControl, setIsHiddenControl] = useState<boolean>(true)

    const handleMouseMove = () => {
        if (isHiddenControl){
            setIsHiddenControl(false)
            setTimeout(() => {
                setIsHiddenControl(true)
            }, 2000)
        }
    }

    return(
        <div className={styles.player_overlay} onMouseMove={handleMouseMove}>
            <PlaybackOnVideoControl/>
            <TimelineControl isHidden={isHiddenControl}/>
            <div className={!isHiddenControl ? styles.player_controls + ' ' + styles.visible : styles.player_controls}>
                <div>
                    <PlaybackControl/>
                    {/*<VolumeControl/>*/}
                    <TimeControl/>
                </div>
                <div>
                    <SettingsControl/>
                    <LayoutControl/>
                    <FullscreenControl/>
                </div>

            </div>
        </div>


    )
}