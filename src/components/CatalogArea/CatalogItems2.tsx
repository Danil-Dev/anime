'use client'




import useSWRInfinite from "swr/infinite";
import {AnimeService} from "@/services/Anime";
import {useMemo} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {AnimeCard} from "@/components/AnimeCard";
import {Button, Center, Grid} from "@chakra-ui/react";
import {FilterType} from "@/components/CatalogArea/types";



interface CatalogItems2Props{
  type: FilterType,
  id: string
}

export default function CatalogItems2({type, id}: CatalogItems2Props) {

  const {data: animePage, isLoading, size, setSize, isValidating, error} = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;

      return `anime/${type}/${id}?page=${pageIndex+1}`
    },
    AnimeService.getCatalogPage,
    {
      initialSize: 1
    }
  )

  const hasNextPage = useMemo(() => {
    if(!animePage) return false
    return animePage[animePage.length - 1].length !== 0
  }, [animePage])

  const onLoadMore = () => {
    setSize( (prev) => prev + 1)
  }

  const animes = animePage ? animePage.flat(): [];

  const [ref] = useInfiniteScroll({
    loading: isValidating,
    disabled: !!error,
    onLoadMore,
    hasNextPage,
    rootMargin: '0px 0px 200px 0px'
  })


  return(
    <>
      <Grid templateColumns={{base: '1fr 1fr', md: 'repeat(4, 1fr)'}} gap={'10px'}>
        {animes.map((anime, idx) => (
          <AnimeCard anime={anime} key={idx} />
        ))}

      </Grid>

      <Center>
        {(isValidating || hasNextPage) && (
          <Button isLoading={isValidating} ref={ref}>
            {isValidating? 'Loading more...' : 'Load more'}
          </Button>
        )}
      </Center>

    </>

  )


}


