
import {AnimeService} from "@/services/Anime";
import styles from './singleAnime.module.scss'
import Image from "next/image";
import {Tags} from "@/components/Tags";
import {Calendar, Star} from "react-feather";

import {EpisodeCard} from "@/components/EpisodeCard";
export default async function SinglePage ({params: {id}} : {params: {id:string}}) {

    const anime = await AnimeService.getAnime(id)
    const pretty_date = new Date(anime.release_date).getFullYear()
    const episodes = anime.episodes
    console.log(pretty_date)
    console.log(anime)


    return (
        <main>
            <section className={styles.single_anime_details} style={{backgroundImage: `url("${anime.image_banner}")`}}>
                <div className="container">
                    <div className="row align-items-center position-relative">
                        <div className="col-xl-3 col-lg-4">
                            <div className={styles.single_anime_details_poster}>
                                <Image src={anime.image} alt={anime.title} width={300} height={430}/>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <div className={styles.single_anime_details_content}>
                                <h5>無職転生 Ⅱ ～異世界行ったら本気だす～ </h5>
                                <h2>{anime.title}</h2>
                                <div className={styles.single_anime_details_content_meta}>
                                    <Tags tags={anime.genre}/>
                                    <div className={styles.single_anime_details_content_date}>
                                        <Calendar size={16}/>
                                        <p>{pretty_date}</p>
                                    </div>
                                    <div className={styles.single_anime_details_content_rating}>
                                        <Star size={16}/>
                                        <p>{anime.rating}</p>
                                    </div>
                                </div>
                                <div className={styles.single_anime_details_content_description}>
                                    <p>{anime.description}</p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.single_anime_info}>
                <div className="container">
                    <div className="row">

                        <div className="col-md-8">
                            <div className={styles.single_anime_info_metadata}>
                                <h2>{anime.title}</h2>
                                <div className={styles.single_anime_info_metadata_item}>
                                    <span>Studio</span>
                                    <span>Bind</span>
                                </div>
                                <div className={styles.single_anime_info_metadata_item}>
                                    <span>Audio</span>
                                    <span>Amanogawa, Amanogawa, Amanogawa</span>
                                </div>
                                <div className={styles.single_anime_info_metadata_item}>
                                    <span>Language</span>
                                    <span>English, Ukrainian</span>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3>Current episode</h3>
                            <EpisodeCard episode={anime.episodes[1]} animeId={anime.id}/>
                        </div>


                        <div className={styles.single_anime_episodes}>

                            <h3>Episodes</h3>

                            {episodes.length === 0 && (
                                <>
                                    <h1>Episodes Data not found</h1>
                                </>
                            )}

                            <div className={styles.single_anime_episodes_wrapper}>

                                {episodes.map((episode , idx)=> (
                                    <EpisodeCard episode={episode} key={idx} animeId={anime.id}/>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </section>



        </main>
    )

}