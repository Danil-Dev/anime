import {useTimeline} from "@/lib/dshaka-player/hooks/useTimeline";
import styles from './controls.module.scss'
import {useAutoplay, usePlayerState} from "@/store/player/hooks";
import {useEffect, useRef} from "react";
import {Button} from "@chakra-ui/react";
export interface AutoplayControlProps{
    intro: string,
    end: number,
    onEnd?: () => void,
    isLastEpisode?: boolean
}

export function SkipControl ({intro = '', end, onEnd, isLastEpisode} : AutoplayControlProps) {

    const {autoplay} = usePlayerState()
    const [introStart, introEnd] = intro.split(':').map((item) => parseInt(item))


    const {currentTime, updateCurrentTime} = useTimeline({
        updateInterval: 250
    })
    const timeoutRef = useRef(null)
    const handleSkipIntro = () => {
        updateCurrentTime(introEnd)
    }

    const handleSkipOutro = () => {
        if(onEnd && typeof onEnd === 'function'){
            onEnd()
        }

    }

    if (autoplay && onEnd && typeof onEnd === 'function' && currentTime > end && !isLastEpisode){
        if (!timeoutRef.current){
            console.log('[SkipControl]: Skip outro before 3 seconds')
            timeoutRef.current = window.setTimeout(onEnd, 3000)
        }
    }



    useEffect(() => {
        return () => {
            if (timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
        }
    }, []);

    useEffect (() => {
        if (intro.length > 0 && autoplay && currentTime > introStart + 3 && currentTime < introEnd - 5){
            handleSkipIntro()
        }
    }, [currentTime, autoplay]);

    if (intro.length > 0 && currentTime > introStart && currentTime < introEnd)
        return (
            // <button className={styles.control_skip}  onClick={handleSkipIntro}>Skip</button>
          <Button
            position={'absolute'}
            zIndex={101}
            bottom={'80px'}
            left={'8px'}
            variant={'outlined'}
            onClick={handleSkipIntro}
          >
              Пропустити
          </Button>
        )

    if (currentTime > end && !isLastEpisode)
        return <Button
          position={'absolute'}
          zIndex={101}
          bottom={'80px'}
          right={'8px'}
          variant={'outlined'}
          onClick={handleSkipOutro}>
            Наступний епізод
        </Button>


}