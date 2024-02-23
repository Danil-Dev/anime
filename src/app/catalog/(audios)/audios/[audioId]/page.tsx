import {AnimeService} from "@/services/Anime";
import CatalogItems from "@/components/CatalogArea/CatalogItems";


export default async function AudioPage({params: { audioId }} : { params: { audioId: string}}){

  const animeList = await AnimeService.getAudio(audioId)

  return (
    <>
      <CatalogItems animeList={animeList}/>
    </>
  )

}