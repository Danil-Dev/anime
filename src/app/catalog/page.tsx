import React from "react";
import styles from './catalog.module.scss'
import {AnimeService} from "@/services/Anime";
import {AnimeCard} from "@/components/AnimeCard";



export default async function Catalog() {

    const genres = ['Бойовик', 'Пригоди', 'Драма','Еччі','Фентезі','Жахи','Махо-шьоджьо','Меха','Music','Містика',]
    const studios = ['amanogawa','amanogawa','amanogawa','amanogawa',]
    const anime = await AnimeService.getAllAnime()


    return (
        <main>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>KAТАЛОГ АНИМЕ</h3>
                            <div className={styles.filter}>
                                <div className={styles.filter_genres}>
                                    {genres.map((genre, idx) => (
                                        <div className={styles.checkBox_wrapper} key={idx}>
                                            <input type={"checkbox"} />
                                            <label>{genre}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.filter_studios}>
                                    {studios.map((studio, idx)=>(
                                        <div className={styles.checkBox_wrapper} key={idx}>
                                            <input type={"checkbox"}/>
                                            <label>{studio}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                {anime.map((anime, idx)=>(
                                    <AnimeCard key={idx} anime={anime} width={200}/>
                                ))}

                                {anime.map((anime, idx)=>(
                                    <AnimeCard key={idx} anime={anime} width={200}/>
                                ))}

                                {anime.map((anime, idx)=>(
                                    <AnimeCard key={idx} anime={anime} width={200}/>
                                ))}

                                {anime.map((anime, idx)=>(
                                    <AnimeCard key={idx} anime={anime} width={200}/>
                                ))}
                            </div>



                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
