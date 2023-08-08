import {useRef} from "react";
import {useFullScreen, useOrientation} from "@/lib/limeplay-core/";
import styles from './fullscreenControl.module.scss'
import {Maximize, Minimize} from "react-feather";


export function FullscreenControl () {

    const elementRef = useRef(document.getElementById('limeplay-player'))
    const {orientation, lockOrientation, unlockOrientation} = useOrientation({
        onError: (error) => {
            console.log(error)
        },

        onChange: (event) => {
            if ( orientation.type.includes('landscape') && !isFullScreen){
                enterFullScreen()
            }
            else if(orientation.type.includes('portrait') && isFullScreen) {
                exitFullScreen()
            }
        }
    })
    const {
        isFullScreen,
        enterFullScreen, exitFullScreen,
        isFullScreenSupported,
        toggleFullScreen
    } = useFullScreen({
        elementRef,
        onEnter: () => {
            lockOrientation('landscape')
        },
        onExit: unlockOrientation,
        onError: (error) => {
            console.log('Hook', error)
        }
    })



    return (
        <div className={styles.fullscreen}>
            <button
                aria-label={isFullScreen ? 'Exit Fullscreen' : ' Enter Fullscreen'}
                disabled={!isFullScreenSupported}
                onClick={toggleFullScreen}
            >
                {isFullScreen ? <Minimize size={24}/> : <Maximize size={24}/> }
            </button>
        </div>
    )
}