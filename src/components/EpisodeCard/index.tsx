import {IEpisodeData} from "@/services/Anime";
import styles from './episodeCard.module.scss'
import Image from "next/image";
import {Play} from "react-feather";
import Link from "next/link";
interface EpisodeCardProps {
    episode: IEpisodeData,
    animeId: string
}
export function EpisodeCard ({episode, animeId}: EpisodeCardProps) {


    return(
        <div className={styles.episodeCard}>
            <Link href={`/anime/${animeId}/watch?ep=${episode.episode_number}`}>
                <div className={styles.episodeCard_thumb}>
                        <Image src={episode.image_thumb} alt={episode.title} width={320} height={180}/>


                    <div className={styles.episodeCard_thumb_icon}>
                        <Play size={24}/>
                    </div>
                </div>
            </Link>
            <div className={styles.episodeCard_title}>
                <Link href={`/anime/${animeId}/watch`}>
                    <h3>E{episode.episode_number} - {episode.title}</h3>
                </Link>
            </div>
        </div>
    )
}