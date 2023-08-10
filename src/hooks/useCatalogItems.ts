import useSWR from "swr";
import {AnimeService} from "@/services/Anime";


export function useCatalogItems(catalog: string = 'all'){

    const {data, isLoading, error} = useSWR(`anime/catalog/${catalog}`, AnimeService.getCatalog)


    return {
        animeList: data,
        isLoading,
        isError: error
    }
}