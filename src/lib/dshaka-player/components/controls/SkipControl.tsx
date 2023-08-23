import {useTimeline} from "@/lib/dshaka-player/hooks/useTimeline";
import styles from './controls.module.scss'
import {useAutoplay} from "@/store/player/hooks";
import {useEffect, useRef} from "react";
export interface AutoplayControlProps{
    start: number,
    end: number,
    onEnd?: () => void,
    isLastEpisode?: boolean
}

export function SkipControl ({start, end, onEnd, isLastEpisode} : AutoplayControlProps) {

    const autoplay = false

    const {currentTime, updateCurrentTime} = useTimeline({
        updateInterval: 250
    })
    const timeoutRef = useRef(null)
    const handleSkipIntro = () => {
        updateCurrentTime(start + 85)
    }

    const handleSkipOutro = () => {
        if(onEnd && typeof onEnd === 'function'){
            onEnd()
        }

    }

    if (autoplay && onEnd && typeof onEnd === 'function' && currentTime > end && !isLastEpisode){
        if (!timeoutRef.current){
            console.log('[SkipControl]: Skip outro before 10 seconds')
            timeoutRef.current = window.setTimeout(onEnd, 10000)
        }
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
        }
    }, []);

    if (currentTime > start && currentTime < start + 85)
        return (
            <button className={styles.control_skip}  onClick={handleSkipIntro}>Skip</button>
        )

    if (currentTime > end && !isLastEpisode)
        return <button className={styles.control_skip} data-location={'right'} onClick={handleSkipOutro}>Skip outro</button>


}