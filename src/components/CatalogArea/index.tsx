'use client'
import React from "react";
import styles from './catalogArea.module.scss'
import {Filter} from "@/components/Filter/Filter";
import CatalogItems from "@/components/CatalogArea/CatalogItems";
import {useCatalogItems} from "@/hooks/useCatalogItems";
import {useParams} from "next/navigation";
import CategoryFilter from "@/components/CatalogArea/CategoryFilter";
import {AnimeCardSkeleton} from "@/components/AnimeCard/Skeleton";
import {AnimeListSkeleton} from "@/components/AnimeList/AnimeListSkeleton";


export default function CatalogArea () {

    const genres = ['Бойовик', 'Пригоди', 'Драма','Еччі','Фентезі',]


    const voicingList = ['Amonogawa', 'Tagaroshi', 'Dzuski', 'FanVoxUa']

    const params = useParams()

    const {animeList, isLoading} = useCatalogItems(
        params.genre && typeof params.genre === 'string' ? params.genre : 'all'
    )

    return(
       <>
            <div className="col-md-3">
                <div className={styles.filters}>
                    <div className={styles.filters_filter}>
                        <CategoryFilter genres={genres} title={'Аніме за жанром'}/>
                    </div>

                    <div className={styles.filters_filter}>
                        <CategoryFilter genres={voicingList} title={'Озвучення'}/>
                    </div>

                </div>
            </div>
           <div className="col-md-9">

               {isLoading ? <AnimeListSkeleton isLoading={isLoading}/> : <CatalogItems animeList={animeList}/>}

           </div>
       </>
    )
}