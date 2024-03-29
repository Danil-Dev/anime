import styles from "@/lib/dshaka-player/components/player.module.scss";
import {ControlsOverlay} from "@/lib/dshaka-player/components/controls";
import {useEffect, useRef} from "react";
import {useShakaPlayer} from "@/lib/dshaka-player/hooks/useShakaPlayer";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {usePlayerState} from "@/store/player/hooks";
import mux from 'mux.js';
import { Box } from "@chakra-ui/react";
import {Flex} from "@chakra-ui/layout";
// @ts-ignore
import shaka from "shaka-player";
interface ShakaPlayerProps {
    url: string,
    currentTime?: number,
    onOnmountPlayer?: (number: number) => void,
    intro: string,
    end: number,
    onEnd?: () => void,
    isLastEpisode?: boolean,
    onPlay?: (video: HTMLVideoElement) => void,
    onPause?: (video: HTMLVideoElement) => void,
    onSeeked?: (video: HTMLVideoElement) => void,
    poster?: string
}


export function ShakaPlayer({
    url,
    currentTime = 0,
    onOnmountPlayer,
    intro,
    end,
    onEnd,
    isLastEpisode,
    onPlay,
    onPause,
    onSeeked,
    poster

}: ShakaPlayerProps) {

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null);



    const { error, isLoaded} = useShakaPlayer()
    const {setVideo, setContainer, video, player} = useShaka()

    const {track, speed, volume, audio, subtitle} = usePlayerState()


    useEffect(() => {
        setVideo(videoRef.current)
        setContainer(containerRef.current)

        if (isLoaded && player && video){
            // console.log('[ShakaPlayer]: Configure')

            // @ts-ignore
            if (!window.muxjs){
                // @ts-ignore
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


                    //92bXpCZKY_5P7StgCoZt2dVnSNB44rl2wfYEtSJX

                    const tracks = player.getVariantTracks()


                    if (track !== 'auto'){
                        const findTrack = tracks.find(trackVariant => trackVariant.height === track)
                        if (findTrack){
                            player.selectVariantTrack(findTrack)
                        }
                    }


                    const findAudio = tracks.find(trackVariant => trackVariant.label === audio)

                    if (findAudio){
                        player.selectVariantsByLabel(audio)
                    }
                    const findSubtitle = player.getTextTracks().find(track => track.language === subtitle)

                    if (findSubtitle){
                        player.selectTextTrack(findSubtitle)
                        player.setTextTrackVisibility(true)
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

                    video.play()


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
        <Flex
          width={'100%'}
          transition={' width .2s cubic-bezier(.4,0,1,1)'}
          position={'relative'}
          alignItems={'center'}
          justifyContent={'center'}
          overflow={'hidden'}
          background={'black'}
          height={containerRef.current ? containerRef.current.clientWidth / 16 * 9 : '300px'}
          maxH={'90vh'}
          ref={containerRef}
        >

            <Box
                position={'relative'}
                width={'auto'}
                height={'100%'}
                sx={{
                    '& > video': {
                        height: '100% !important',
                    }
                }}
            >
                <video
                  controls={false}
                  id={'shaka-player'}
                  width={'100%'}
                  height={'100%'}
                  ref={videoRef}
                  poster={poster}
                ></video>
            </Box>


            {isLoaded &&  (
                <div className={styles.player_overlay_container} >
                    <ControlsOverlay intro={intro} end={end} onEnd={onEnd} isLastEpisode={isLastEpisode} />
                </div>
            )}
        </Flex>
    )
}