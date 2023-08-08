import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface EpisodeSave{
    time: number,
    episodeNumber: number
}

export interface AnimeSave {
    animeId: string,
    episodes: EpisodeSave[],

}

export interface WatchState {
    animeSaves: AnimeSave[]
}

const initialState: WatchState = {
    animeSaves: []
}

const watchSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        updateAnime(state, action: PayloadAction<AnimeSave>){

            const findAnimeIndex = state.animeSaves.findIndex(animeSave => animeSave.animeId === action.payload.animeId);

            if (findAnimeIndex !== -1) {
                state.animeSaves[findAnimeIndex] = action.payload;
            } else {
                state.animeSaves.push(action.payload);
            }
        },
        updateEpisode(state, action: PayloadAction<{ animeId: string, episode: EpisodeSave }>) {
            const { animeId, episode } = action.payload;

            // Находим аниме по animeId
            const animeIndex = state.animeSaves.findIndex(animeSave => animeSave.animeId === animeId);

            // Если аниме найдено
            if (animeIndex !== -1) {
                // Находим эпизод по episodeNumber
                const episodeIndex = state.animeSaves[animeIndex].episodes.findIndex(ep => ep.episodeNumber === episode.episodeNumber);

                // Если эпизод найден, обновляем его
                if (episodeIndex !== -1) {
                    state.animeSaves[animeIndex].episodes[episodeIndex] = episode;
                } else {
                    // В противном случае добавляем новый эпизод
                    state.animeSaves[animeIndex].episodes.push(episode);
                }
            } else{
                state.animeSaves.push({
                    animeId,
                    episodes: [episode]
                })
            }
            // Если аниме не найдено, можно либо игнорировать запрос, либо добавить новый элемент в animeSaves.
            // Это зависит от вашей логики приложения.
        }

    }

})

export const {updateAnime, updateEpisode} = watchSlice.actions

export default watchSlice.reducer