'use client';
import {SimpleGrid, Skeleton} from "@chakra-ui/react";
import {ItemCardSkeleton} from "@/components/Skeleton/ItemCardSkeleton";


export function CategorySkeleton(){
  return(
    <>
      <SimpleGrid columns={{base: 2, md: 3}} spacing={'15px'}>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
        <ItemCardSkeleton/>
      </SimpleGrid>
    </>
  )
}