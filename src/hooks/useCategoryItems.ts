import useSWR from "swr";
import {AnimeService} from "@/services/Anime";


export function useCategoryItems(category: string = 'all'){

    const {data, isLoading, error} = useSWR(`anime/categories/${category}`, AnimeService.getCategory)


    return {
        animeList: data,
        isLoading,
        isError: error
    }
}