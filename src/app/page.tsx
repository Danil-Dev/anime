import MainBanner from "@/components/MainBanner";
import {AnimeService} from "@/services/Anime";
import {AnimeList} from "@/components/AnimeList";


export default async function Home() {

    const all_anime = await AnimeService.getAllAnime()
    console.log(all_anime)
  return (
    <main>
      <MainBanner/>

        <AnimeList all_anime={all_anime} />
    </main>
  )
}
