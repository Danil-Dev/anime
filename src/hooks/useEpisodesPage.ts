import useSWR from "swr";
import {AnimeService} from "@/services/Anime";


export function useEpisodesPage(animeId: string, page: number = 1){
  const {data, isLoading, error} = useSWR(`get/episodes/${animeId}/?page=${page}`, AnimeService.getEpisodes)

  return {
    episodes: data,
    isLoading,
    isError: error
  }
}