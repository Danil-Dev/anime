import {AnimeService, IAnimeData} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";
import {useRouter} from "next/router";

import {usePathname} from "next/navigation";


export default async function WatchPage({params: {id}}: {params: {id: string, episode: string}}) {

    console.log('Watch', id)

    const anime = await AnimeService.getAnime(id)

    console.log('Anime', anime)



    return(

        <CustomPlayer anime={anime}/>


    )

}



