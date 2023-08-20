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
    isLastEpisode?: boolean,
    onPlay?: (video: HTMLVideoElement) => void,
    onPause?: (video: HTMLVideoElement) => void,
    onSeeked?: (video: HTMLVideoElement) => void,
}

export function ShakaPlayer({
    url,
    currentTime = 0,
    onOnmountPlayer,
    start,
    end,
    onEnd,
    isLastEpisode,
    onPlay,
    onPause,
    onSeeked
}: ShakaPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null);
    const { player, error, isLoaded} = useShakaPlayer()
    const [height, setHeight] = useState(0)

    const {setVideo, setContainer, video} = useShaka()
    const {track, speed, volume} = usePlayerState()




    useEffect(() => {

        setVideo(videoRef.current)
        setContainer(containerRef.current)

    }, [videoRef.current]);

    useEffect(() => {


        console.log('[ShakaPlayer]: Mount Player', isLoaded)

        if (isLoaded && player && video){

            console.log('[ShakaPlayer]: Loaded', player.getLoadMode())
            try{
                const localConfig = {
                    abr: { enabled: track === 'auto' },
                    manifest: { dash: { ignoreMinBufferTime: true } },
                    streaming: {
                        useNativeHlsOnSafari: true,
                    },
                };

                player.configure(localConfig)



                player.load(url).then(() => {
                    if (video){
                        console.log('[ShakaPlayer]: Loaded', video)



                        // if (track !== 'auto'){
                        //     const findTrack = player.getVariantTracks().find(trackVariant => trackVariant.height === track)
                        //     if (findTrack){
                        //         player.selectVariantTrack(findTrack)
                        //     }
                        // }
                        // video.playbackRate = speed
                        // video.volume = volume
                        // if (currentTime){
                        //     video.currentTime = currentTime
                        // }
                        //
                        // if (onPlay && typeof onPlay === 'function' && video){
                        //     video.addEventListener('play', () => onPlay(video))
                        // }
                        // if (onPause && typeof onPause === 'function' && video){
                        //     video.addEventListener('pause', () => onPause(video))
                        // }
                        // if (onSeeked && typeof onSeeked === 'function' && video){
                        //     video.addEventListener('seeked', () => onSeeked(video))
                        // }

                    }


                }).catch((error) => {
                    console.log('[ShakaPlayer]: ErrorLoad', error)

                })

                player.addEventListener('error', (event) => {
                    console.log('[ShakaPlayer]: Error', event)
                })
            }
             catch (e){
                console.log(e)
             }





        }

        return () => {

             if (onOnmountPlayer && typeof onOnmountPlayer === 'function'){
                 if (isLoaded){
                     console.log('[ShakaPlayer]: onOnmountPlayer',  video)
                     onOnmountPlayer(video)
                 }
             }
             if (onPlay && typeof onPlay === 'function' && video){
                 video.removeEventListener('play', () => onPlay(video))
             }
             if (onPause && typeof onPause === 'function' && video){
                 video.removeEventListener('pause', () => onPlay(video))
             }
             if (onSeeked && typeof onSeeked === 'function' && video){
                 video.removeEventListener('seeked', () => onSeeked(video))
             }


        }
    }, [player, error, isLoaded, url, video]);



    if (error) return <div>{error}</div>








    return (
        <div className={styles.player} ref={containerRef} style={{height: height}}>
            <video controls={false} id={'shaka-player'}  ref={videoRef} width={'100%'} height={'100%'}></video>

            {isLoaded &&  (
                <div className={styles.player_overlay_container} >
                    <ControlsOverlay start={start} end={end} onEnd={onEnd} isLastEpisode={isLastEpisode} />
                </div>
            )}
        </div>
    )
}