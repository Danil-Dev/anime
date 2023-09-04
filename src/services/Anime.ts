import {BASE_API_URL} from '@/configs/constants'

export interface Genre{
    title: string,
    name: string
}

export interface IAnimeFoundData {
    title: string,
    id: string,
    rating: number,
    description: string,
    image: string,
    genres: Genre[],
    release_date: string,
}
export interface IEpisodeData {
    episode_number: number,
    // start: number,
    intro: string,
    end: number,
    title: string,
    description: string,
    video: string,
    duration: string,
    image_thumb: string,
    _id: string

}


export interface IAnimeData {
    _id: string,
    title: string,
    id: string,
    rating: number,
    description: string,
    image: string,
    genres: Genre[],
    release_date: string,
    image_banner: string,
    episodes: IEpisodeData[],
    auth: boolean,
    isInWatchlist?: boolean,
    lastWatchedEpisode?: number
}

export interface IBannerData{
    title: string,
    genres: Genre[],
    studio: string,
    description: string,
    link: string,
    image: string,
    image_banner:string
}

export interface IAnimeList{
    animeList: IAnimeData[],
    title: string,
    link: string
}
export interface IAnimeSingle {
    anime: IAnimeData
}
export interface UserData   {
    isInWatchlist: boolean,
    lastEpisode: number
}



export const AnimeService = {
    async getAllAnime () : Promise<IAnimeData[]> {
        const res = await fetch(`${BASE_API_URL}/all_anime`,{
            next: {
                revalidate: 60
            }
        })

        return res.json()
    },

    async getAnime(animeId : string, userId?: string): Promise<IAnimeData>{

        const res = await fetch(`${BASE_API_URL}/get/anime`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            cache: "no-store",
            body: JSON.stringify({animeId, userId: userId || null}),
        })

        // console.log(res)
        const data =  await res.json()


        return data
    },

    async getAnimeLists(animeLists: string[]): Promise<[string, IAnimeData[]]>{
        const res = await fetch(`${BASE_API_URL}/get/anime/lists`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            next: {
                revalidate: 60
            },
            body: JSON.stringify({animeLists}),
        })

        const data = await res.json()

        console.log (data)

        return data
    } ,
    async getAnimeWithCredentials(animeId : string, userId: string): Promise<UserData>{

        const res = await fetch(`${BASE_API_URL}/anime/${animeId}/${userId}`, {
            headers: {"Content-Type": "application/json"},
            cache: "no-store",
        })

        const data =  await res.json()

        console.log(data);

        return data
    },

    async searchAnime(search: string): Promise<IAnimeData[] | null>{
        const res = await fetch(`${BASE_API_URL}/search?q=${search}`)
        return res.json()
    },


    async getCatalog(catalog: string): Promise<IAnimeData[]>{
        console.log('Get catalog', catalog)

        const res = await fetch(`${BASE_API_URL}/anime/catalog/${catalog}`, {
            next: {
                revalidate: 60
            }
        })

        return res.json()
    },

    async getCategory (key: string): Promise<IAnimeData[]>{

        console.log(`${BASE_API_URL}/category/${key}`)

        const res = await fetch(`${BASE_API_URL}/anime/genre/${key}`, {
            next: {
                revalidate: 60
            }

        })

        return  res.json()
    },

    async getRandomAnime (): Promise<IAnimeData>{
        const res = await fetch(`${BASE_API_URL}/randomAnime/`, {
            next: {
                revalidate: 60
            }
        })
        return res.json()

    },

    async getEpisodes(url: string): Promise<IEpisodeData[]>{

        console.log ('Get episodes', url)
        const res = await fetch(`${BASE_API_URL}/${url}`, {
            next: {
                revalidate: 60
            }
        })

        return res.json()
    },

    async getEpisodeData(animeId: string,episodeNumber: number ){
        const res = await fetch(`${BASE_API_URL}/get/episode`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            next: {
                revalidate: 60
            },
            body: JSON.stringify({animeId, episodeNumber}),

        })

        return await res.json()
    }


}