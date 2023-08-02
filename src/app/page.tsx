import MainBanner from "@/components/MainBanner";
import {AnimeService} from "@/services/Anime";
import {AnimeList} from "@/components/AnimeList";
import styles from  "./main.module.scss"

export default async function Home() {

    const all_anime = await AnimeService.getAllAnime()
  return (
    <main>
      <MainBanner/>
        <div className={styles.main_anime_section}>
            <AnimeList all_anime={all_anime} title={'Ongoings'} />
            <AnimeList all_anime={all_anime} title={'Popular'} />
            <AnimeList all_anime={all_anime} title={'All anime'} />
        </div>
    </main>
  )
}
