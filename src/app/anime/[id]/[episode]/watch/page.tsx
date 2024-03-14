import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";
import Comments from "@/components/Comments";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/auth";
import {Metadata} from "next";
import BlockPlayer from "@/components/BlockPlayer";


type Props = {
  params: { id: string, episode: string}
}

export async function generateMetadata(
  {params} : Props
): Promise<Metadata>{

  const {id, episode} = params
  console.log ("Metadata", id, episode)
  const episodeData = await AnimeService.getEpisodeData(id, +episode)
  const anime = await AnimeService.getAnime(id)
  console.log (episode)

  return {
    title: `Дивитись ${anime.title} епізод ${episodeData.currentEpisode.episode_number} | Aniverse`,
    description: episodeData.currentEpisode.description,
    keywords: [anime.title, `${anime.title} епізод ${episode}`, `Дивитись ${anime.title}`],
    openGraph: {
      title: `Дивитись ${anime.title} епізод ${episodeData.currentEpisode.episode_number} | Aniverse`,
      description: episodeData.currentEpisode.description,
      url: `https://aniverse.website/anime/${anime.id}`,
      images: [
        {
          url: `https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${episodeData.currentEpisode.image_thumb}/opengraph`,
          width: 1280,
          height: 670,
        },
        {
          url: `https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${episodeData.currentEpisode.image_thumb}/opengraphalt`, // Must be an absolute URL
          width: 500,
          height: 500,
          alt: 'My custom alt',
        },
      ]
    }
  }

}
export default async function WatchPage({params: {id, episode}}: {params: {id: string, episode: string}}) {



    const session = await getServerSession(authOptions)
    const episodeData = await AnimeService.getEpisodeData(id, +episode)

    const geo = await fetch('https://aniverse.website/api/edge-geo').then(res => res.json())

    console.log (geo)


    return(
        <>
          {
            geo.country !== 'UA' ? <BlockPlayer/> : <CustomPlayer episodeData={episodeData}/>
          }

            <Comments user={session? session.user.id : null} id={episodeData.id}/>
        </>



    )

}

