import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";

export default async function WatchPage({params: {id, episode}}: {params: {id: string, episode: string}}) {

    console.log ("ID", id)
    const episodeData = await AnimeService.getEpisodeData(id, +episode)




    return(

        <CustomPlayer episodeData={episodeData}/>


    )

}

