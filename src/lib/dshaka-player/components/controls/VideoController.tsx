import styles from './controls.module.scss'
import {Play} from "react-feather";
import {usePlayback} from "@/lib/dshaka-player/hooks/usePlayback";
import {useFullscreen} from "@/lib/dshaka-player/hooks/useFullscreen";
import {useLoading} from "@/lib/dshaka-player/hooks/useLoading";

export function VideoController(){

    const {isPlaying, togglePlayback} = usePlayback()
    const {isLoading} = useLoading()
    const {toggleFullscreen} = useFullscreen()



    return (
        <>
            {isLoading ?
                (<div className={styles.control_video} onDoubleClick={toggleFullscreen}>
                    <div className={styles.control_loader}></div>
                </div>)
                : (<div className={styles.control_video} onClick={togglePlayback} onDoubleClick={toggleFullscreen}>
                    {!isPlaying ? <Play size={48}/>: null}
                </div>)
            }

        </>
    )
}