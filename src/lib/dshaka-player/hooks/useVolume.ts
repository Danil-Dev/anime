import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useState} from "react";
import clamp from "lodash/clamp";
import {usePlayerState} from "@/store/player/hooks";
import useStateRef from "react-usestateref";
import log from "loglevel";

export function useVolume(){

    const {video} = useShaka()
    const [muted, setMuted, mutedRef] = useStateRef(video.muted)
    const {volume: PlayerVolume} = usePlayerState()
    const [volume, setVolume] = useState<number>(PlayerVolume)

    const [lastVolume, setLastVolume, lastVolumeRef] = useStateRef(muted ? 0: video.volume )

    const toggleMute = () => {
        video.muted = !video.muted
    }


    const updateCurrentVolume = useCallback((vol: number) => {
        if (video.readyState === 0 || Number.isNaN(vol)) return;

        vol = clamp(vol, 0, 1)
        video.volume = vol
    }, [video])


    useEffect (() => {
        const volumeEventHandler = () => {

            if(video.muted !== mutedRef.current){
                setMuted(video.muted)

                if(video.muted){
                    setVolume(0)
                } else {
                    setVolume(lastVolumeRef.current)
                }
            }
            else if ( video.muted === true && video.volume > 0){
                video.muted = false
                setMuted(false)
                setVolume(video.volume)
            } else if (video.volume === 0){

                video.muted = true
                setMuted(true)
                setVolume(video.volume)
            }
            else {
                setVolume(video.volume)
            }

            if (video.volume > 0){
                setLastVolume(video.volume)
            }
        }


        const events = ['volumechange']

        events.forEach(event => {
            video.addEventListener(event, volumeEventHandler)
        })

        return () => {
            if (video){
                events.forEach(event => {
                    video.removeEventListener(event, volumeEventHandler)
                })
            }
        }
    }, []);


    return {
        volume,
        updateCurrentVolume,
        muted,
        lastVolume,
        toggleMute
    }

}