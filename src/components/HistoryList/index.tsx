'use client'


import useSWRInfinite from "swr/infinite";
import {UserServices} from "@/services/User";
import {useMemo} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {Grid} from "@chakra-ui/layout";
import HistoryCard from "@/components/AnimeCard/HistoryCard";
import {Button, Center} from "@chakra-ui/react";

export default function HistoryList({userId} : {userId: string}) {



  const {data: historyPage, setSize, size, isValidating, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {

      console.log ('TEST', pageIndex, previousPageData)
      if (previousPageData && !previousPageData.length) return null

      return `user/${userId}/history?page=${pageIndex + 1}`
    },
    UserServices.getDynamicHistory,
    {
      initialSize: 1
    }
  )

  console.log (historyPage, size, isValidating, error)



  const hasNextPage = useMemo(() => {
    if (!historyPage) return false
    return historyPage[historyPage.length - 1].length !== 0
  }, [historyPage])

  const onLoadMore = () => {
    setSize( (prev) => prev + 1)
  }

  const history = historyPage ? historyPage.flat() : []

  console.log (history)


  const [ref] = useInfiniteScroll({
    loading: isValidating,
    disabled: !!error,
    onLoadMore,
    hasNextPage,
    rootMargin: '0px 0px 200px 0px'
  })


  return(
    <>
      <Grid templateColumns={{base: 'repeat(2, 1fr)', md:'repeat(4, 1fr)'}} gap={4  }>
        {history.map((historyItem, index) => (
          <HistoryCard historyItem={historyItem} key={index}/>
        ))}
      </Grid>
      <Center>
        {(isValidating || hasNextPage) && (
          <Button isLoading={isValidating} ref={ref}>
            {isValidating? 'Loading more...': 'Load more'}
          </Button>
        )}
      </Center>
    </>

  )




}