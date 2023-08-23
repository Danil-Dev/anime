'use client'
import {IAnimeData} from "@/services/Anime";
import React from "react";

import CatalogItems from "@/components/CatalogArea/CatalogItems";
import {useCatalogItems} from "@/hooks/useCatalogItems";
import {useParams} from "next/navigation";
import {AnimeListSkeleton} from "@/components/AnimeList/AnimeListSkeleton";
import {Grid, GridItem, Box, HStack, VStack} from "@chakra-ui/react";
import CatalogFilter from "@/app/catalog/CatalogFilter";


export default function CatalogArea () {

    const genres = [
        {
            id: 'action',
            title: 'Бойовик',
        },
        {
            id: 'adventure',
            title: 'Пригоди',
        },
        {
            id: 'drama',
            title: 'Драма',
        },
        {
            id: 'ecchi',
            title: 'Еччі',
        },
        {
            id: 'fantasy',
            title: 'Фентезі',
        }
    ]


    const voicingList = [
        {
            id: 'amonogawa',
            title: 'Amonogawa',
        },
        {
            id: 'tagaroshi',
            title: 'Tagaroshi',
        },
        {
            id: 'dzuski',
            title: 'Dzuski',
        },
        {
            id: 'fanvoxua',
            title: 'FanVoxUa',
        }
    ]

    const categoryList =[
        {
            id: 'popular',
            title: 'Популярні',
        },
        {
            id: 'new',
            title: 'Нові',
        },
        {
            id: 'ongoing',
            title: 'Онгоінги',
        }
    ]

    const params = useParams()

    const {animeList, isLoading} = useCatalogItems(
        params.genre && typeof params.genre === 'string' ? params.genre : 'all'
    )

    return(
       <Grid
           templateColumns='1fr 3fr'
           gap={8}
           marginTop={'20px'}
       >
           <GridItem>
               <VStack spacing={'20px'}>
                   <Box
                       borderRadius={'8px'}
                       w={'100%'}
                   >
                       <CatalogFilter filter={genres} type={'genres'} title={'Аніме за жанром'} defaultIsOpen={params.genre && typeof params.genre === 'string'}/>
                   </Box>
                   <Box
                       borderRadius={'8px'}
                       w={'100%'}
                       border={'1px solid'}
                       borderColor={'backgroundOutline'}
                   >
                       <CatalogFilter type={'sub'} filter={voicingList} title={'Озвучення'}/>
                   </Box>
                   <Box
                       borderRadius={'8px'}
                       w={'100%'}
                       border={'1px solid'}
                       borderColor={'backgroundOutline'}
                   >
                       <CatalogFilter type={'categories'} filter={categoryList} title={'Категори'}/>
                   </Box>
               </VStack>
           </GridItem>
           <GridItem>
               {isLoading ? <AnimeListSkeleton isLoading={isLoading}/> : <CatalogItems animeList={animeList}/>}
           </GridItem>
       </Grid>

    )
}