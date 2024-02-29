
import {BASE_API_URL} from '@/configs/constants'

export interface EpisodeHistory {
    episode_number:number,
    image_thumb: string,
    duration: number,
    _id: string,
    title: string
}
export interface AnimeHistory {
    animeId: string,
    episodeNumber: number,
    currentTime: number,
    watchedOn?: Date,
    episodeId?: string,
}

export interface AnimeHistory2{
    success: boolean,
    watchedEpisodes: { watchedOn: Date, currentTime: number},
    episodeDetails: { episode_number: number, title: string, image_thumb: string },
    animeDetails: { id: string, title: string}
}
export interface ExtendedAnimeHistory  {
    episodeId: EpisodeHistory,
    animeId: { id: string, title: string },
    episodeNumber: number,
    watchedOn: Date,
    currentTime: number,
    _id: string
}


export const UserServices = {
    async updateUserWatchedHistory(animeId: string, userId: string,  currentTime: number, episodeId: string, episodeNumber: number) {
        const res = await fetch(`${BASE_API_URL}/update/user/history`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({animeId, userId, currentTime, episodeId, episodeNumber})
        })

        return res.status === 200
    },

    async getWatchlist(userId: string) {
        const res = await fetch(`${BASE_API_URL}/user/${userId}/watchlist`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            next: {
                revalidate: 60
            }
        })

        return await res.json()
    },
    async getHistory(userId: string) {
        const res = await fetch(`${BASE_API_URL}/user/${userId}/history`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            cache: "no-store",

        })

        return await res.json()
    },
    async getDynamicHistory (url: string): Promise<AnimeHistory2[]> {

        const res = await fetch(`${BASE_API_URL}/${url}`, {
            next: {
                revalidate: 60
            }
        })
        return res.json()

    },

    async getUserEpisodeHistory(userId: string, episodeId: string) {

        console.log(userId, episodeId, 'saveEpisode')
      const res = await fetch(`${BASE_API_URL}/user/${userId}/episode/${episodeId}`, {
          method: "GET",
          cache: "no-store",
          headers: {"Content-Type": "application/json"},
      })

        return await res.json()
    },
    async getLastWatchedEpisode(userId: string, animeId: string) {
        console.log(userId, animeId, 'getLastWatchedEpisode');
        const res = await fetch(`${BASE_API_URL}/user/${userId}/${animeId}/lastWatched`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        const data = await res.json()
        if (data.success){
            console.log(data, 'data')
            return data.episode
        }
        return 0
    },
    async addToWatchlist(userId: string, animeId: string) {

        console.log(userId, animeId, 'addToWatchlist')
        const res = await fetch(`${BASE_API_URL}/update/user/watchlist`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId, animeId}),
        })
        return res.status === 200
    },
    async removeFromWatchlist( animeId: string, userId: string, ){
        const res = await fetch(`${BASE_API_URL}/remove/user/watchlist`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            cache: "no-store",
            body: JSON.stringify({userId, animeId}),
        })

        return await res.json()

    }
}