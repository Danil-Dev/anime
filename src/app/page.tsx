import MainBanner from "@/components/MainBanner";
import {AnimeService, IBannerData} from "@/services/Anime";
import {AnimeList} from "@/components/AnimeList";
import styles from  "./main.module.scss"
import ComingAnimes from "@/components/ComingAnimes";

export default async function Home() {

    const all_anime = await AnimeService.getAllAnime()

    const bannerData : IBannerData = {
        title: 'Магічна битва (2 сезон)',
        genre: ['Бойовик', 'Драма', 'Надприродне'],
        studio: 'Cтудiя: MAPPA',
        description: 'ОПИСАНИЕ ОЧЕНЬ МНОГА ТЕКСТА ВОТ',
        link: '/',
        image_banner:'/assets/img/banner/comingAnimeMagicBattleSliderItem.jpg',
        image: '/assets/img/poster/mushoku.webp'
    }
    const bannerData2 : IBannerData = {
        title: 'Магічна битва (3 сезон)',
        genre: ['Бойовик', 'Драма', 'Надприродне'],
        studio: 'Cтудiя: MAPPA',
        description: 'ОПИСАНИЕ ОЧЕНЬ МНОГА ТЕКСТА ВОТ',
        link: '/',
        image_banner:'/assets/img/banner/comingAnimeMagicBattleSliderItem.jpg',
        image: '/assets/img/poster/mushoku.webp'
    }
    const bannerData3 : IBannerData = {
        title: 'Mushoku Tensei',
        genre: ['Пригоди', 'Драма', 'Еччі','Фентезі'],
        studio: 'Cтудiя: Studio Bind',
        description: 'ОПИСАНИЕ ОЧЕНЬ МНОГА ТЕКСТА ВОТ ПРО РЕИНКАРНАЦИЮ',
        link: '#',
        image_banner:'/assets/img/banner/mushoku_banner.avif',
        image: '/assets/img/poster/mushoku.webp'

    }

    const banners = [bannerData, bannerData2, bannerData3]
  return (
    <main>
      <MainBanner/>
        <div className={styles.main_anime_section}>
            <AnimeList all_anime={all_anime} title={'Ongoings'} />
            <AnimeList all_anime={all_anime} title={'Popular'} />
            <ComingAnimes banners={banners}/>
            <AnimeList all_anime={all_anime} title={'All anime'} />
        </div>

    </main>
  )
}
