import {useEffect, useRef} from "react";
import shaka from 'shaka-player'


const useShakaPlayer = (url: string) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerRef = useRef<shaka.Player>(null)


    useEffect(() => {
        const video = videoRef.current
        if (!video) return;

        const player = new shaka.Player(video)

        playerRef.current = player

        player.load(url).catch((error) => {
            console.error('Ошибка при загрузке видео:', error);
        })

        return () => {
            playerRef.current?.destroy()
            playerRef.current = null
        }
    }, [url]);


    return {videoRef, playerRef}
}

export default useShakaPlayer