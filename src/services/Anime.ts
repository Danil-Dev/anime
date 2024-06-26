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
export interface IEpisode {
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


export interface IAudio{
    title: string,
    name: string,
    language: string
}

export interface IStudio{
    title: string,
    id: string,
    link: string
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
    episodes: IEpisode[],
    auth: boolean,
    isInWatchlist?: boolean,
    lastWatchedEpisode?: IEpisode | null,
    audios: IAudio[],
    studio: IStudio
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

export interface ICategory {
    title: string,
    name: string
}
export interface UserData   {
    isInWatchlist: boolean,
    lastEpisode: number
}

export interface IComment{
    user: {
        _id: string,
        name: string,
        image: string
    },
    content: string,
    commentType: 'Anime' | 'Episode',
    date: string,
    forId: string
}

export interface IEpisodeData{
    id: string,
    currentEpisode: IEpisode,
    prevEpisode: null | {
        episode_number: number,
        title: string,
        image_thumb: string,
    },
    nextEpisode: null | {
        episode_number: number,
        title: string,
        image_thumb: string,
    }
}

export interface ICollectionItem{
    title: string,
    id: string,
    image: string,
    release_date: Date
}

export interface ICollection{
    title: string,
    animeIds: ICollectionItem[]
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

    async getAnime(animeId : string, userId?: string): Promise<IAnimeData | null>{

        const res = await fetch(`${BASE_API_URL}/get/anime`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            cache: "no-store",
            body: JSON.stringify({animeId, userId: userId || null}),
        })

        if (res.status === 200){
            return res.json()
        }
        else{
            return null
        }
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

    async getCatalogPage(url: string): Promise<IAnimeData[]>{
        const res = await fetch(`${BASE_API_URL}/${url}`, {
            next: {
                revalidate: 60
            }
        })

        return res.json()
    },

    async getGenre (key: string): Promise<IAnimeData[]>{


        const res = await fetch(`${BASE_API_URL}/anime/genre/${key}`, {
            next: {
                revalidate: 60
            }

        })

        return  res.json()
    },

    async getAudio (audioId: string): Promise<IAnimeData[]> {

        const res = await fetch (`${BASE_API_URL}/anime/audio/${audioId}`, {
            next: {
                revalidate: 60
            }
        })

        return res.json ()
    },

    async getRandomAnime (): Promise<IAnimeData>{
        const res = await fetch(`${BASE_API_URL}/randomAnime/`, {
            next: {
                revalidate: 60
            }
        })
        return res.json()

    },

    async getEpisodes(url: string): Promise<IEpisode[]>{

        console.log ('Get episodes', url)
        const res = await fetch(`${BASE_API_URL}/${url}`, {
            next: {
                revalidate: 60
            }
        })

        return res.json()
    },

    async getEpisodeData(animeId: string,episodeNumber: number ) : Promise<IEpisodeData>{
        const res = await fetch(`${BASE_API_URL}/get/episode`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            next: {
                revalidate: 60
            },
            body: JSON.stringify({animeId, episodeNumber}),

        })

        return await res.json()
    },

    async getCatalogFilter(key: string): Promise<ICategory[]> {


        console.log ('Key is ', key)
        const res = await fetch(`${BASE_API_URL}/${key}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            next: {
                revalidate: 3600
            }
        })

        return await res.json()
    },

    async getComments (key: string): Promise<IComment[]>{
        const res = await fetch(`${BASE_API_URL}/${key}`, {
            next: {
                revalidate: 60
            },
        })

        return res.json()
    },

    async getCollection(animeId: string): Promise<ICollection[]> {
        const res = await fetch(`${BASE_API_URL}/collection/${animeId}`, {
            next: {
                revalidate: 60
            },
        })

        return res.json()
    }


}