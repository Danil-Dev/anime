import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";

export default async function WatchPage({params: {id, episode}}: {params: {id: string, episode: string}}) {

    console.log('Watch', id, episode)

    const anime = await AnimeService.getAnime(id)

    const episodeData = await AnimeService.getEpisodeData(id, +episode)

    // console.log('Anime', anime)

    console.log ('Episode', episodeData)



    return(

        <CustomPlayer episodeData={episodeData}/>


    )

}

