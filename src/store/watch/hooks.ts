import {useAppSelector} from "@/store/hooks";


export function useEpisodeState(animeId: string, episodeNumber: number){
    return useAppSelector( state => {
        const anime = state.watch.animeSaves.find(animeSave => animeSave.animeId === animeId)

        if (!anime) return null

        const episode = anime.episodes.find(ep => ep.episodeNumber === episodeNumber)

        return episode || null
    })
}