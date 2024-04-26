'use client'


import {Heading} from "@chakra-ui/layout";
import useSWR from "swr";
import {AnimeService} from "@/services/Anime";
import {CollectionItem} from "@/components/Collection/CollectionItem";
import {SimpleGrid, Skeleton} from "@chakra-ui/react";

export function Collection({animeId}: {animeId: string}) {

    const {data, isLoading} = useSWR(animeId, AnimeService.getCollection)

    console.log("Collection", data)

    // if (!isLoading) return <h1>Loading...</h1>;

    return(
        <>
            {isLoading && <Skeleton h={'40px'}></Skeleton>}
            {!isLoading && data.length > 0 && <Heading>Зв&apos;язане</Heading>}

            { !isLoading ?  data.length > 0 && data[0] && data[0].animeIds.length > 0 ? (

                <SimpleGrid columns={{ base: 2, md: 5}} spacing={2}>
                    {data[0].animeIds.map((item) => (
                        <CollectionItem item={item} key={item.id}/>
                    ))}
                </SimpleGrid>

            ) : null : (
                <SimpleGrid columns={{ base: 2, md: 5}} spacing={2}>
                    <Skeleton  height={220}/>
                    <Skeleton  height={220}/>
                    <Skeleton  height={220}/>
                    <Skeleton  height={220}/>
                </SimpleGrid>
            )}



        </>
    )
}