import {useAppSelector} from "@/store/hooks";
import {EpisodeSave} from "@/store/watch/reducer";


export function useEpisodeState(animeId: string, episodeNumber: number){
    return useAppSelector( state => {
        const anime = state.watch.animeSaves.find(animeSave => animeSave.animeId === animeId)

        if (!anime) return null

        const episode = anime.episodes.find(ep => ep.episodeNumber === episodeNumber)

        return episode || null
    })
}

export function useLastEpisode(animeId: string){
    // const anime = state.watch.animeSaves.find(animeSave => animeSave.animeId === animeId)

    const animeSaves = useAppSelector((state) => state.watch.animeSaves);

    // Полагаем, что animeSaves содержит информацию о каждом просмотренном эпизоде
    let lastWatchedEpisode: EpisodeSave | undefined;

    animeSaves.forEach(anime => {
        anime.episodes.forEach(episode => {
            // Если это первый просмотренный эпизод, или если время просмотра этого эпизода больше, чем время просмотра последнего просмотренного эпизода,
            // обновляем lastWatchedEpisode
            if (!lastWatchedEpisode || episode.episodeNumber > lastWatchedEpisode.episodeNumber) {
                lastWatchedEpisode = episode
            }
        });
    });

    return lastWatchedEpisode;

}