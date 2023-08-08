import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useState} from "react";

export interface UsePlaybackRateConfig{
    onSelect?: (selectedRate: number) => void
}


export function usePlaybackRate({onSelect}: UsePlaybackRateConfig = {}) {

    const {video} = useShaka()

    const [currentRate, setCurrentRate] = useState(video.playbackRate)

    const selectRate = useCallback((rate: number) => {
        if (video.readyState === 0) return;
        video.playbackRate = rate
        setCurrentRate(rate)

        if (onSelect && typeof onSelect === 'function'){
            onSelect(rate)
        }
    }, [onSelect, video])


    const updatePlaybackRate = useCallback((event) => {

        if (video){
            console.log('update playbackRate', event, video.playbackRate)
            if(event.target){
                setCurrentRate(video.playbackRate)
            }
        }
    }, [])

    useEffect(() => {


        video.addEventListener('ratechange', updatePlaybackRate)


        return () => {
            if (video){
                video.removeEventListener('ratechange', updatePlaybackRate)
            }
        }
    }, [video, updatePlaybackRate]);



    return{
        currentRate,
        selectRate
    }
}