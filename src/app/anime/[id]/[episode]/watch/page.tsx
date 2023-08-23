import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";

export default async function WatchPage({params: {id, episode}}: {params: {id: string, episode: string}}) {

    console.log('Watch', id, episode)

    const anime = await AnimeService.getAnime(id)

    console.log('Anime', anime)



    return(

        <CustomPlayer anime={anime}/>


    )

}

