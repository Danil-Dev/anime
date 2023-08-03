import {RefObject, useCallback, useState} from "react";


interface PlaybackProps{
    videoRef: RefObject<HTMLVideoElement | null>
}

const usePlayback = ({videoRef}: PlaybackProps) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const togglePlay = useCallback(() => {
        const video = videoRef.current
        if (video){
            if (video.paused){
                video.play()
                setIsPlaying(true)
            } else {
                video.pause()
            }
        }
    }, [videoRef])


    return { isPlaying, togglePlay}
}

export default usePlayback