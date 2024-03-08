import {AnimeService} from "@/services/Anime";
import {CustomPlayer} from "@/components/CustomPlayer";
import Comments from "@/components/Comments";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/auth";
import {Metadata} from "next";

type Props = {
  params: { id: string, episodeNumber: string}
}

async function generateMetadata(
  {params} : Props
): Promise<Metadata>{

  const {id, episodeNumber} = params

  const episode = await AnimeService.getEpisodeData(id, +episodeNumber)
  const anime = await AnimeService.getAnime(id)

  return {
    title: `Дивитись ${anime.title} епізод ${episode.currentEpisode.episode_number} | Aniverse`,
    description: episode.currentEpisode.description,
    keywords: [anime.title, `${anime.title} епізод ${episodeNumber}`, `Дивитись ${anime.title}`],
    openGraph: {
      title: `Дивитись ${anime.title} епізод ${episode.currentEpisode.episode_number} | Aniverse`,
      description: episode.currentEpisode.description,
      url: `https://aniverse.website/anime/${anime.id}`,
      images: [
        {
          url: `https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${episode.currentEpisode.image_thumb}/opengraph`,
          width: 1280,
          height: 670,
        },
        {
          url: `https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${episode.currentEpisode.image_thumb}/opengraphalt`, // Must be an absolute URL
          width: 500,
          height: 500,
          alt: 'My custom alt',
        },
      ]
    }


  }

}
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

