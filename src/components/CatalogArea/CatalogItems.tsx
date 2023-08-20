'use client'
import {IAnimeData} from "@/services/Anime";

import {AnimeCard} from "@/components/AnimeCard";
import {Box} from "@chakra-ui/layout";

interface CatalogItemsProps{
    animeList: IAnimeData[]
}

export default function CatalogItems({animeList}: CatalogItemsProps) {
    console.log('CatalogItems', animeList)
    return (
        <>

            {animeList.length >=1 && (
                <Box>
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} width={210}/>
                    ))}
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} width={210}/>
                    ))}
                    {animeList.map((anime, idx) => (
                        <AnimeCard anime={anime} key={idx} width={210}/>
                    ))}
                </Box>
            )}
        </>
    )

}