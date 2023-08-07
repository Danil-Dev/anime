'use client'
import {IAnimeData} from "@/services/Anime";
import {useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {useEpisodeState} from "@/store/watch/hooks";
import {updateEpisode} from "@/store/watch/reducer";
import {ShakaPlayer} from "@/lib/dshaka-player/components/ShakaPlayer";
import styles from './watch.module.scss'
import Link from "next/link";
import {Eye, Star} from "react-feather";
import {Tags} from "@/components/Tags";
import Scrollbar from "react-scrollbars-custom";
import {EpisodeItem} from "@/components/EpisodesList/EpisodeItem";

export function CustomPlayer ({anime}: {anime: IAnimeData}) {


    const [currentEpisode, setCurrentEpisode] = useState<number>(0)
    const [currentSeason, setCurrentSeason] =  useState<number>(0)
    const isLastEpisode = !Boolean(anime.seasons[currentSeason].episodes[currentEpisode + 1])
    const episode = anime.seasons[currentSeason].episodes[currentEpisode]
    const dispatch = useAppDispatch()
    const episodeInfo = useEpisodeState(anime.id, currentEpisode)
    const handleOnmountPlayer = (video: HTMLVideoElement) => {
        // console.log('Player onmount', player, video)
        // console.log('Curr time', video.currentTime)
        console.log('[EpisodeArea]: Try save EpisodeData')
        if (video){
            dispatch(updateEpisode({
                animeId: anime.id,
                episode: {
                    episodeNumber: currentEpisode,
                    time: video.currentTime
                }
            }))
        }

    }
    const onEnd = () => {
        console.log('[ShakaPlayer]: Video is end')
        console.log('[ShakaPlayer]: Next Episode', anime.seasons[currentSeason].episodes[currentEpisode + 1])
        setCurrentEpisode(currentEpisode + 1)

    }
    const handleChangeEpisode = ( number : number) => {
        console.log('Change episode to ', number)
        setCurrentEpisode(number)
        console.log(currentEpisode, anime.seasons[currentSeason].episodes[currentEpisode])
    }


    return (
        <>
            <ShakaPlayer
                url={episode.video}
                start={episode.start}
                end={episode.end}
                onOnmountPlayer={handleOnmountPlayer}
                onEnd={onEnd}
                currentTime={episodeInfo? episodeInfo.time: null}
                isLastEpisode={isLastEpisode}
            />
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className={styles.episode_info}>
                            <div className={styles.episode_info_header}>
                                <Link href={`/anime/${anime.id}/`}>
                                    {anime.title}
                                </Link>
                                <h2>E{episode.episode_number} - {episode.title}</h2>
                                <div className={styles.episode_info_metadata}>
                                    <div>
                                        <Tags tags={anime.genre}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.episode_info_description}>
                                <p>Принцесса Ариэль была как никогда близка к смерти, но от разъярённого зверя её спасла загадочная незнакомка, упавшая с неба. Но кто эта девочка? И как Ариэль отплатить своей спасительнице</p>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className={styles.episode_info_episodes}>
                            {!isLastEpisode && (
                                <div className={styles.episode_info_episodes_episode}>
                                    <h2>Next episode</h2>
                                    <EpisodeItem episode={anime.seasons[currentSeason].episodes[currentEpisode + 1]} handleChangeEpisode={handleChangeEpisode}/>
                                </div>
                            )}
                            {currentEpisode !== 0 && (

                                <div className={styles.episode_info_episodes_episode}>
                                    <h2>Prev episode</h2>
                                    <EpisodeItem episode={anime.seasons[currentSeason].episodes[currentEpisode - 1]} handleChangeEpisode={handleChangeEpisode}/>
                                </div>
                            )}
                            <Link href={`/anime/${anime.id}`}>
                                <button className={styles.episode_info_episodes_more_btn}>
                                    <Eye size={18}/> More Episodes
                                </button>
                            </Link>

                        </div>



                    </div>

                </div>
            </div>
        </>

    )
}