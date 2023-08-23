import {SimpleGrid} from "@chakra-ui/react";
import {AnimeCardSkeleton} from "@/components/AnimeCard/Skeleton";


interface AnimeListSkeletonProps{
    count?: number,
    isLoading: boolean
}


export function AnimeListSkeleton({count=8, isLoading}: AnimeListSkeletonProps){

    console.log(isLoading, count)

    return(
        <SimpleGrid columns={4} spacing={'15px'}>
            <AnimeCardSkeleton isLoading={isLoading}/>
            <AnimeCardSkeleton isLoading={isLoading}/>
            <AnimeCardSkeleton isLoading={isLoading}/>
            <AnimeCardSkeleton isLoading={isLoading}/>
            <AnimeCardSkeleton isLoading={isLoading}/>
            <AnimeCardSkeleton isLoading={isLoading}/>
            <AnimeCardSkeleton isLoading={isLoading}/>
            <AnimeCardSkeleton isLoading={isLoading}/>
        </SimpleGrid>
    )
}