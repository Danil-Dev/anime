'use client'
import styles from './singleAnime.module.scss'
import {IAnimeData} from "@/services/Anime";
import {useState} from "react";

import {EpisodesList} from "@/components/EpisodesList";
import {ShakaPlayer} from "@/lib/dshaka-player/components/ShakaPlayer";
import {useAppDispatch} from "@/store/hooks";
import {updateEpisode} from "@/store/watch/reducer";
import {useEpisodeState} from "@/store/watch/hooks";


export const EpisodeArea = ({anime} : {anime : IAnimeData}) => {

    const [currentEpisode, setCurrentEpisode] = useState<number>(0)
    const [currentSeason, setCurrentSeason] =  useState<number>(0)
    const dispatch = useAppDispatch()
    const episodeInfo = useEpisodeState(anime.id, currentEpisode)

    const episode = anime.seasons[currentSeason].episodes[currentEpisode]
    const isLastEpisode = !Boolean(anime.seasons[currentSeason].episodes[currentEpisode + 1])


    console.log('[EpisodeArea]: CurrentEpisode', episode, isLastEpisode)
    const handleChangeEpisode = ( number : number) => {
        console.log('Change episode to ', number)
        setCurrentEpisode(number)
        console.log(currentEpisode, anime.seasons[currentSeason].episodes[currentEpisode])
    }

    const onEnd = () => {
        console.log('[ShakaPlayer]: Video is end')
        console.log('[ShakaPlayer]: Next Episode', anime.seasons[currentSeason].episodes[currentEpisode + 1])
        setCurrentEpisode(currentEpisode + 1)

    }

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
    return(
        <section className={styles.single_anime_player}>
            <div className="container">
                <div className="row">
                    <div className={styles.single_anime_player_wrapper}>
                        <ShakaPlayer
                            start={episode.start}
                            end={episode.end}
                            url={episode.video}
                            onOnmountPlayer={handleOnmountPlayer}
                            currentTime={episodeInfo ? episodeInfo.time : null}
                            onEnd={onEnd}
                        />
                        <EpisodesList seasons={anime.seasons} handleChangeEpisode={handleChangeEpisode}/>
                    </div>
                    <div className={styles.single_anime_info}>
                        <h2>{episode.title}</h2>
                    </div>

                </div>
            </div>
        </section>
    )
}