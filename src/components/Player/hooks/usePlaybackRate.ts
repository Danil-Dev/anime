import {useLimeplay} from "@/lib/limeplay-core";
import {useCallback, useState} from "react";


export function usePlaybackRate() {

    const { playbackRef} = useLimeplay()
    const playback = playbackRef.current
    const [currentRate, setRate] = useState<number>(1)

    const selectRate = useCallback((rate: number) => {
        if (playback.readyState === 0 ) return;
        playback.playbackRate = rate
        setRate(rate)
    }, [playback])

    return {currentRate, selectRate}
}