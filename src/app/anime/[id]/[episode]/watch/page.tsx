import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";

export default async function WatchPage({params: {id, episode}}: {params: {id: string, episode: string}}) {

    console.log('Watch', id, episode)


    const episodeData = await AnimeService.getEpisodeData(id, +episode)


    console.log ('Episode', episodeData)



    return(

        <CustomPlayer episodeData={episodeData}/>


    )

}

