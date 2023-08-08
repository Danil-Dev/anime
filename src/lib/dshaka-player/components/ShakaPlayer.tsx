import {useShakaPlayer} from "@/lib/dshaka-player/hooks/useShakaPlayer";
import {useEffect, useRef, useState} from "react";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import styles from './player.module.scss'
import {ControlsOverlay} from "@/lib/dshaka-player/components/controls";
import {useAppDispatch} from "@/store/hooks";
import {usePlayerState} from "@/store/player/hooks";

interface ShakaPlayerProps {
    url: string,
    currentTime?: number,
    onOnmountPlayer?: (video: HTMLVideoElement) => void,
    start: number,
    end: number,
    onEnd?: () => void,
    isLastEpisode?: boolean
}

export function ShakaPlayer({
    url,
    currentTime = 0,
    onOnmountPlayer,
    start,
    end,
    onEnd,
    isLastEpisode
}: ShakaPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null);
    const {video, player, error, isLoaded} = useShakaPlayer()
    const [height, setHeight] = useState(0)

    const {setVideo, setContainer} = useShaka()
    const {track, speed, volume} = usePlayerState()
    const dispatch = useAppDispatch()




    useEffect(() => {
        setVideo(videoRef.current)
        setContainer(containerRef.current)

    }, []);

    useEffect(() => {

        if (isLoaded && player && video){


            const localConfig = {
                abr: { enabled: track === 'auto' },
                manifest: { dash: { ignoreMinBufferTime: true } },
                streaming: {
                    useNativeHlsOnSafari: true,
                },
            };

            player.configure(localConfig)



            player.load(url).then(() => {
                if (videoRef.current){

                    const height = (videoRef.current.offsetWidth / 16) * 9
                    setHeight(height)
                    if (track !== 'auto'){
                        const findTrack = player.getVariantTracks().find(trackVariant => trackVariant.height === track)
                        if (findTrack){
                            player.selectVariantTrack(findTrack)
                        }
                    }
                    video.playbackRate = speed
                    console.log('[ShakaPlayer]: Current time', currentTime)
                    if (currentTime){
                        video.currentTime = currentTime
                    }

                }
            })


        }

        return () => {
             if (onOnmountPlayer && typeof onOnmountPlayer === 'function'){
                 if (isLoaded){
                     onOnmountPlayer(video)
                 }
             }
        }
    }, [player, error, isLoaded, url]);








    return (
        <div className={styles.player} ref={containerRef} style={{height: height}}>
            <video controls={false} id={'shaka-player'}  ref={videoRef} width={'100%'} height={'100%'}></video>

            {isLoaded && (
                <div className={styles.player_overlay_container} >
                    <ControlsOverlay start={start} end={end} onEnd={onEnd} isLastEpisode={isLastEpisode} />
                </div>
            )}
        </div>
    )
}