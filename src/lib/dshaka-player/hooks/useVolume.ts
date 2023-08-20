import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useState} from "react";
import clamp from "lodash/clamp";
import {usePlayerState} from "@/store/player/hooks";

export function useVolume(){

    const {video} = useShaka()
    const {volume: PlayerVolume} = usePlayerState()
    const [volume, setVolume] = useState<number>(PlayerVolume)



    const updateCurrentVolume = useCallback((vol: number) => {
        if (video.readyState === 0 || Number.isNaN(vol)) return;

        console.log("updateCurrentVolumeHook", vol)
        vol = clamp(vol, 0, 1)
        video.volume = vol
        setVolume(vol)
    }, [video])


    return {
        volume,
        updateCurrentVolume
    }

}