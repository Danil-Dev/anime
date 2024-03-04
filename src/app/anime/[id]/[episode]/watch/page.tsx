import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";
import Comments from "@/components/Comments";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/auth";

export default async function WatchPage({params: {id, episode}}: {params: {id: string, episode: string}}) {

    console.log ("ID", id)

    const session = await getServerSession(authOptions)
    const episodeData = await AnimeService.getEpisodeData(id, +episode)

  console.log (session)


    return(
        <>
            <CustomPlayer episodeData={episodeData}/>
            <Comments user={session? session.user.id : null} id={episodeData.id}/>
        </>



    )

}

