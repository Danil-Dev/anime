'use client'
import styles from './singleAnime.module.scss'
import {IAnimeData} from "@/services/Anime";
import {useState} from "react";
import {VideoPlayer} from "@/components/Player";
import {EpisodesList} from "@/components/EpisodesList";
import DShakaPlayer from "@/lib/dshaka-player/components/DShakaPlayer";
import {PlayerLoader} from "@/components/Player/Controls/Loader";
import {ControlsOverlay} from "@/components/Player/Controls/ControlsOverlay";
import usePlayback from "@/lib/dshaka-player/hooks/usePlayback";
import useShakaPlayer from "@/lib/dshaka-player/hooks/useShakaPlayer";

export const EpisodeArea = ({anime} : {anime : IAnimeData}) => {

    const [currentEpisode, setCurrentEpisode] = useState<number>(0)
    const [currentSeason, setCurrentSeason] =  useState<number>(0)


    const handleChangeEpisode = ( number : number) => {
        console.log('Change episode to ', number)
        setCurrentEpisode(number)
        console.log(currentEpisode, anime.seasons[currentSeason].episodes[currentEpisode])
    }
    return(
        <section className={styles.single_anime_episodes}>
            <div className="container">
                <div className="row">
                    <div className={styles.single_anime_episodes_wrapper}>
                        <DShakaPlayer src={'https://customer-8a7vcp9ynbyjxc8a.cloudflarestream.com/4a597a033d1a074fd6ed16dce6e41bff/manifest/video.mpd'}>
                            <div className={styles.player_overlay_wrapper}>

                            </div>
                        </DShakaPlayer>
                        <EpisodesList seasons={anime.seasons} handleChangeEpisode={handleChangeEpisode}/>
                    </div>
                </div>
            </div>
        </section>
    )
}