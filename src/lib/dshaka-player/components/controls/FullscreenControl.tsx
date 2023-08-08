
import styles from './controls.module.scss'
import {Maximize, Minimize} from "react-feather";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useFullscreen} from "@/lib/dshaka-player/hooks/useFullscreen";


export function FullscreenControl() {

    const {
        isFullscreenSupported,
        isFullScreen,
        toggleFullscreen
    } = useFullscreen()

    return (
        <div className={styles.control_fullscreen}>
            <button
                aria-label={isFullScreen ? 'Exit Fullscreen' : ' Enter Fullscreen'}
                disabled={!isFullscreenSupported}
                onClick={toggleFullscreen}
            >
                {isFullScreen ? <Minimize size={24}/> : <Maximize size={24}/> }
            </button>
        </div>
    )
}