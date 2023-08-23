import styles from "@/lib/dshaka-player/components/player.module.scss";
import {ControlsOverlay} from "@/lib/dshaka-player/components/controls";
import {useEffect, useRef} from "react";
import {useShakaPlayer} from "@/lib/dshaka-player/hooks/useShakaPlayer";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {usePlayerState} from "@/store/player/hooks";
import mux from 'mux.js';
interface ShakaPlayerProps {
    url: string,
    currentTime?: number,
    onOnmountPlayer?: (number: number) => void,
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

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { error, isLoaded} = useShakaPlayer()
    const {setVideo, setContainer, video, player} = useShaka()

    const {track, speed, volume} = usePlayerState()


    useEffect(() => {
        console.log('[ShakaPlayer]: Mount Player', currentTime)
        setVideo(videoRef.current)
        setContainer(containerRef.current)

        if (isLoaded && player && video){
            // console.log('[ShakaPlayer]: Configure')

            if (!window.muxjs){
                window.muxjs = mux
            }

            const localConfig = {
                abr: { enabled: track === 'auto'},
                manifest: { dash: { ignoreMinBufferTime: true } },
                streaming: {
                    useNativeHlsOnSafari: true,
                },
            };

            player.configure(localConfig)



                player.load(url, currentTime).then(() => {
                    console.log('[ShakaPlayer]: Load Complete')

                    if (track !== 'auto'){
                        const findTrack = player.getVariantTracks().find(trackVariant => trackVariant.height === track)


                        const langs = player.getAudioLanguages()
                        const subs = player.getTextTracks()
                        const subsLangs = player.getTextLanguages()

                        console.log('langs', langs, subs, subsLangs)
                        if (findTrack){
                            player.selectVariantTrack(findTrack)
                        }
                        video.playbackRate = speed
                        video.volume = volume
                        if (onPlay && typeof onPlay === 'function' && video){
                            video.addEventListener('play', () => onPlay(video))
                        }
                        if (onPause && typeof onPause === 'function' && video){
                            video.addEventListener('pause', () => onPause(video))
                        }
                        if (onSeeked && typeof onSeeked === 'function' && video){
                            video.addEventListener('seeked', () => onSeeked(video))
                        }
                    }

                }).catch((e) => {
                    console.log(e, error)
                })

        }


        return () => {

            const _currentVideo = video
            setVideo(null)

            if (_currentVideo){
                if(onPlay && typeof onPlay === 'function'){
                    _currentVideo.removeEventListener('play', () => onPlay(_currentVideo))
                }
                if(onPause && typeof onPause === 'function'){
                    _currentVideo.removeEventListener('pause', () => onPause(_currentVideo))
                }
                if(onSeeked && typeof onSeeked === 'function'){
                    _currentVideo.removeEventListener('seeked', () => onSeeked(_currentVideo))
                }
                if (onOnmountPlayer && typeof onOnmountPlayer === 'function'){
                    _currentVideo.pause()
                    onOnmountPlayer(_currentVideo.currentTime)
                }
            }


        }


    },[video, player, url])

    return(
        <div className={styles.player} ref={containerRef}
             // style={{height: height}}
        >
            <video controls={false} id={'shaka-player'}  ref={videoRef} width={'100%'} height={'100%'}></video>

            {isLoaded &&  (
                <div className={styles.player_overlay_container} >
                    <ControlsOverlay start={start} end={end} onEnd={onEnd} isLastEpisode={isLastEpisode} />
                </div>
            )}
        </div>
    )
}