import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useState} from "react";
import clamp from "lodash/clamp";
import useStateRef from "react-usestateref";

export function useVolume(){

    const {video} = useShaka()
    const [volume, setVolume] = useState<number>(video.volume)



    const updateCurrentVolume = useCallback((vol: number) => {
        if (video.readyState === 0 || Number.isNaN(vol)) return;
        vol = clamp(vol, 0, 1)
        video.volume = vol
        setVolume(vol)
    }, [])


    return {
        volume,
        updateCurrentVolume
    }

}