'use client';
import { Button, Center, Container, Grid, GridItem, Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import useSWRInfinite from "swr/infinite";
import { AnimeService } from "@/services/Anime";
import { EpisodeCard } from "@/components/EpisodeCard";
import { useEffect, useMemo, useRef } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

export function EpisodesList() {
    // Get the id from the URL parameters
    const { id } = useParams();

    console.log ('id', id)

    // Create a ref for the container div
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch episodes using SWRInfinite
    const { data: episodesPage, isLoading, size, setSize, isValidating, error } = useSWRInfinite(
      (pageIndex, previousPageData) => {
          // If previous page data exists and is empty, it means we have reached the end
          if (previousPageData && !previousPageData.length) return null;

          // Return the API endpoint for fetching episodes
          return `get/episodes/${id}?page=${pageIndex + 1}`;
      },
      AnimeService.getEpisodes,
      {
          initialSize: 1,
      }
    );

    // Check if there is a next page
    const hasNextPage = useMemo(() => {
        if (!episodesPage) return false;
        return episodesPage[episodesPage.length - 1].length !== 0;
    }, [episodesPage]);

    // Load more episodes
    const onLoadMore = () => {
        setSize((prev) => prev + 1);
    };

    // Flatten the episodes array
    const episodes = episodesPage ? episodesPage.flat() : [];

    // Use the useInfiniteScroll hook
    const [ref] = useInfiniteScroll({
        loading: isValidating,
        disabled: !!error,
        onLoadMore,
        hasNextPage,
        rootMargin: '0px 0px 200px 0px',
    });

    // Log episodes, loading state, size, and validation state on useEffect
    useEffect(() => {
        console.log(episodes, isLoading, size, isValidating);
    }, [episodesPage, isValidating, isLoading, size, setSize]);

    return (
      <Container maxW={'container.xl'} pt={{ base: '25px', md: '50px' }} pb={'50px'}>
          <Heading>Епізоди</Heading>
          {isValidating && episodes.length === 0 ? (
            <Spinner />
          ) : (
            <>
                <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={6} ref={containerRef}>
                    {episodes.map((episode, idx) => (
                      <GridItem key={idx}>
                          <EpisodeCard episode={episode} animeId={Array.isArray(id) ? id[0]: id} />
                      </GridItem>
                    ))}
                </Grid>
                <Center>
                    {(isValidating || hasNextPage) && (
                      <Button isLoading={isValidating} ref={ref}>
                          {isValidating ? 'Loading more...' : 'Load more'}
                      </Button>
                    )}
                </Center>
            </>
          )}
      </Container>
    );
}