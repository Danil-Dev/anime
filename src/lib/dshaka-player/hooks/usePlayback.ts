import {useEffect, useState} from "react";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";

export function usePlayback() {
    const [isPlaying, setIsPlaying] = useState(false)
    const {video} = useShaka()

    const togglePlayback = () => {

        if (!video.duration) return;

        if(video.paused) video.play()
        else video.pause()
    }

    useEffect(() => {
        const playbackEventHandler = () => setIsPlaying(!video.paused)

        const events = ['play', 'pause', 'waiting', 'seeking', 'seeked'];

        events.forEach((event) => {
            video.addEventListener(event, playbackEventHandler);
        });

        return () => {
            if (video){
                events.forEach((event) => {
                    video.removeEventListener(event, playbackEventHandler)
                })
            }
        }

    }, []);


    return {
        isPlaying,
        togglePlayback
    }
 }