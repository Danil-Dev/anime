
export interface IEpisodeData {
    episode_number: number,
    start: number,
    end: number,
    title: string,
    description: string,
    video: string,
    duration: string,
    image_thumb: string

}

export interface ISeasonData {
    season_number: number,
    season_image: string,
    episodes: IEpisodeData[]
}


export interface IAnimeData {
    title: string,
    id: string,
    rating: number,
    description: string,
    image: string,
    genre: string[],
    release_date: string,
    image_banner: string,
    seasons: ISeasonData[]
}

export interface IAnimeList{
    all_anime: IAnimeData[],
    title: string
}
export interface IAnimeSingle {
    anime: IAnimeData
}

const BASE_API_URL = 'http://localhost:3301'

export const AnimeService = {
    async getAllAnime () : Promise<IAnimeData[]> {
        const res = await fetch(`${BASE_API_URL}/all_anime`,{
            next: {
                revalidate: 60
            }
        })

        return res.json()
    },

    async getAnime(animeId : string): Promise<IAnimeData>{
        const res = await fetch(`${BASE_API_URL}/anime/${animeId}`, {
            next: {
                revalidate: 60
            }
        })

        return res.json()
    }

}