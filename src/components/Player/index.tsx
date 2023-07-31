'use client'
import {IEpisodeData} from "@/services/Anime";
import styles from './player.module.scss'
import {
    ChevronLeft,
    ChevronRight,
    Layout,
    Maximize,
    Minimize,
    Pause,
    Play,
    PlayCircle, Settings,
    Volume1,
    Volume2,
    VolumeX
} from "react-feather";
import {useEffect, useRef, useState} from "react";
import {Stream, StreamPlayerApi} from "@cloudflare/stream-react";
import screenfull from "screenfull";
import {usePlayerLayoutType, useTogglePlayerLayout} from "@/store/application/hooks";
import {PlayerLayoutType} from "@/store/application/reducer";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import('react-player/lazy'), {ssr: false})

enum SetupsModal {
    NONE,
    ALL,
    QUALITY,
    SPEED

}

export const VideoPlayer = ({episode}: { episode: IEpisodeData }) => {
    const videoRef = useRef<StreamPlayerApi | undefined>(undefined)
    const [playing, setPlaying] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.8)
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
    const [setupModal, setSetupModal] = useState<SetupsModal>(SetupsModal.QUALITY)
    const layout = usePlayerLayoutType()
    const togglePlayerLayout = useTogglePlayerLayout()
    const qualities = [360, 480, 720, 1080, 'auto']


    const updateTime = () => {
        console.log('Current time update', videoRef.current?.currentTime)
        if (videoRef.current){
            setCurrentTime(videoRef.current.currentTime)
        }
    }
    const updateDuration = () => {
        console.log('Duration is loaded', videoRef.current?.duration)
        if (videoRef.current){
            setDuration(videoRef.current.duration)
        }
    }
    const handlePlayPause = () => {
        if (videoRef.current) {

            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }

    const onPause = () => {
        setPlaying(false)
    }
    const onPlay = () => {
        setPlaying(true)
    }

    const onLoadedMetaData = () =>{
        if (videoRef.current){

            console.log(videoRef.current)
        }
    }
    const handleVolumeChange = (e: any) => {
        if (videoRef.current){
            videoRef.current.volume = parseFloat(e.target.value)
            setVolume(parseFloat(e.target.value))
        }

    }
    const handleProgressChange = (event : any) => {
        const newTime = event.target.value;
        setCurrentTime(newTime);

        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const handleSetupModal = (modal: SetupsModal) => {
        setSetupModal(modal)
    }
    const handleOpenSetupModal = () => {
        if (setupModal === SetupsModal.NONE){
            setSetupModal(SetupsModal.ALL)
        }
        else{
            setSetupModal(SetupsModal.NONE)
        }
    }

    const toggleFullscreen = () => {
        if (screenfull.isEnabled){
            screenfull.toggle(document.querySelector('#stream-player') || undefined)

        }
    }

    useEffect(() => {
        if (screenfull.isEnabled){
                const handleChangeFullscreen = () => {
                    console.log('Change')
                    setIsFullscreen(screenfull.isFullscreen)
                }

                screenfull.on('change', handleChangeFullscreen)

            return () => {
                    screenfull.off('change', handleChangeFullscreen)
            }
        }
    }, []);

    function formatDuration(duration : number) {

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return hours > 0
            ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
            : `${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <div className={layout === PlayerLayoutType.NORMAl ? styles.player : styles.player_wide} >
            <h1>{episode.title}</h1>
            <div className={ !isFullscreen ? styles.player_wrapper : styles.player_wrapper_fullscreen} id={'stream-player'}>
                {/*<ReactPlayer*/}
                {/*    playing={playing}*/}
                {/*    url={episode.video}*/}
                {/*    style={{position: 'relative'}}*/}
                {/*    volume={volume}*/}
                {/*/>*/}
                <Stream

                    src={episode.video}
                    streamRef={videoRef}
                    onTimeUpdate={updateTime}
                    onDurationChange={updateDuration}
                    onPause={onPause}
                    onPlay={onPlay}
                    onLoadedMetaData={onLoadedMetaData}
                />

                <div className={styles.player_play_pause_wrapper} onClick={handlePlayPause}>
                    { !playing && <Play size={48}/> }
                </div>
                {setupModal !== SetupsModal.NONE && (
                    <div className={styles.player_settups}>
                        {setupModal === SetupsModal.ALL && (
                            <div className={styles.player_settups_all_setups}>
                                <div className={styles.player_settups_menu_item}>
                                    <div className={styles.player_settups_menu_item_icon}>
                                        <PlayCircle size={24}/>
                                    </div>
                                    <div className={styles.player_settups_menu_item_label}>
                                        Quality
                                    </div>
                                    <div className={styles.player_settups_menu_item_content}>
                                        1080p
                                    </div>
                                </div>
                                <div className={styles.player_settups_menu_item}>
                                    <div className={styles.player_settups_menu_item_icon}>
                                        <ChevronRight size={24}/>
                                    </div>
                                    <div className={styles.player_settups_menu_item_label}>
                                        Speed
                                    </div>
                                    <div className={styles.player_settups_menu_item_content}>
                                        1x
                                    </div>
                                </div>
                            </div>
                        )}
                        {setupModal === SetupsModal.QUALITY && (
                            <div className={styles.player_settups_quality_setup}>
                                <div className={styles.player_settups_quality_setup_header}>
                                    <ChevronLeft size={24}/> Quality
                                </div>
                                {qualities.map((quality, index) => (
                                    <div key={index} className={styles.player_settups_quality_setup_menu_item}>
                                        {quality}
                                    </div>
                                ) )}

                            </div>
                        )}

                    </div>
                )}


                <div className={styles.player_controls}>
                    <div>
                        <div className={styles.player_controls_play_pause}>
                            <button type={'button'} onClick={handlePlayPause}>
                                {playing?
                                    <Pause size={24}/> :
                                    <Play size={24}/>}
                            </button>


                        </div>
                        <div className={styles.player_controls_volume}>
                            {
                                volume === 0 ?
                                    <VolumeX size={24}/> :
                                    volume >= 0.5 ?
                                        <Volume2 size={24}/> :
                                        <Volume1 size={24}/>
                            }

                            <div className={styles.player_controls_volume_picker}>
                                <input type="range" min={0} max={1} step='any' value={volume}
                                       onChange={handleVolumeChange}/>
                            </div>
                        </div>
                        <div className={styles.player_controls_progress_bar}>
                            <input
                                type="range"
                                min={0}
                                max={duration}
                                // step={'any'}
                                value={currentTime}

                                onChange={handleProgressChange}
                            />
                        </div>
                        <div className={styles.player_controls_time}>
                            <span>{formatDuration(Math.floor(currentTime))}</span>
                        </div>
                    </div>


                    <div>
                        {!isFullscreen && (
                            <div className={styles.player_controls_layout}>
                                <Layout size={24} onClick={togglePlayerLayout}/>
                            </div>
                        )}
                        <div className={styles.player_controls_settings} onClick={handleOpenSetupModal}>
                            <Settings size={24}/>
                        </div>
                        <div className={styles.player_controls_fullscreen}>
                            {isFullscreen ? <Minimize size={24} onClick={toggleFullscreen}/> : <Maximize size={24} onClick={toggleFullscreen}/>}

                        </div>
                    </div>
                </div>


            </div>


        </div>


    )
}