import styles  from './controls.module.scss'
import {PlaybackControl} from "@/lib/dshaka-player/components/controls/PlaybackControl";
import {TimelineControl} from "@/lib/dshaka-player/components/controls/TimelineControl";
import {VolumeControl} from "@/lib/dshaka-player/components/controls/VolumeControl";
import {TimeControl} from "@/lib/dshaka-player/components/controls/TimeControl";
import {FullscreenControl} from "@/lib/dshaka-player/components/controls/FullscreenControl";
import {SettingsControl} from "@/lib/dshaka-player/components/controls/SettingsControl";
import {VideoController} from "@/lib/dshaka-player/components/controls/VideoController";
import {useState} from "react";
import {AutoPlayControl} from "@/lib/dshaka-player/components/controls/AutoPlayControl";
import {SkipControl} from "@/lib/dshaka-player/components/controls/SkipControl";

interface ControlsOverlayProps{
    start: number,
    end: number,
    onEnd?: () => void,
    isLastEpisode?: boolean
}

export function ControlsOverlay({start, end, onEnd, isLastEpisode}: ControlsOverlayProps){

    const [isHiddenControl, setIsHiddenControl] = useState<boolean>(true)

    const handleMouseMove = () => {
        if (isHiddenControl){
            setIsHiddenControl(false)
            setTimeout(() => {
                setIsHiddenControl(true)
            }, 4000)
        }
    }

    return(
        <div className={styles.player_overlay_wrapper} onMouseMove={handleMouseMove} data-visible={!isHiddenControl}>
            <div className={styles.player_overlay_content} data-visible={!isHiddenControl}>
                <SkipControl start={start} end={end} onEnd={onEnd} isLastEpisode={isLastEpisode}/>
                <VideoController/>
                <div className={styles.control_timeline_wrapper}>
                    <TimelineControl/>
                </div>
                <div className={styles.control_panel}>
                    <div>
                        <PlaybackControl/>
                        <VolumeControl/>
                        <TimeControl/>
                    </div>

                    <div>
                        <AutoPlayControl/>
                        <SettingsControl/>
                        <FullscreenControl/>
                    </div>
                </div>
            </div>

        </div>
    )
}