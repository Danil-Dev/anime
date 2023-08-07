import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";


export default async function WatchPage({params: {id}}: {params: {id: string}}) {

    console.log('Watch', id)

    const anime = await AnimeService.getAnime(id)




    return(


        <>
            <CustomPlayer anime={anime}/>


        </>

    )

}
