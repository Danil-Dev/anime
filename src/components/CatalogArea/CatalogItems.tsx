'use client'
import {IAnimeData} from "@/services/Anime";

import {AnimeCard} from "@/components/AnimeCard";
import {Box} from "@chakra-ui/layout";
import {Grid} from "@chakra-ui/react";

interface CatalogItemsProps{
    animeList: IAnimeData[]
}

export default function CatalogItems({animeList}: CatalogItemsProps) {
    console.log('CatalogItems', animeList)
    return (
        <>

            {animeList.length >=1 && (
                <Grid templateColumns={{base: '1fr 1fr', md: 'repeat(3, 1fr)'}} gap={'10px'}>
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} />
                    ))}
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} />
                    ))}
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} />
                    ))}
                </Grid>
            )}
        </>
    )

}