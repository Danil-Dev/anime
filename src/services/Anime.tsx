
export interface IAnimeFoundData {
    title: string,
    id: string,
    rating: number,
    description: string,
    image: string,
    genre: string[],
    release_date: string,
}
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


export interface IAnimeData {
    title: string,
    id: string,
    rating: number,
    description: string,
    image: string,
    genre: string[],
    release_date: string,
    image_banner: string,
    episodes: IEpisodeData[]
}

export interface IBannerData{
    title: string,
    genre: string[],
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

 export const BASE_API_URL = 'http://localhost:3301'

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
    },

    async searchAnime(search: string): Promise<IAnimeData[] | null>{
        const res = await fetch(`${BASE_API_URL}/search?q=${search}`)
        return res.json()
    },

    async getCatalog(catalog: string): Promise<IAnimeData[]>{
        console.log('Get catalog', catalog)

        const res = await fetch(`${BASE_API_URL}/${catalog}`)

        return res.json()
    },

    async getCategory (category: string): Promise<IAnimeData[]>{

        console.log(`${BASE_API_URL}/category/${category}`)

        const res = await fetch(`${BASE_API_URL}/anime/category/${category}`)

        return  res.json()
    }


}