import MainBanner from "@/components/MainBanner";
import {AnimeService, IBannerData} from "@/services/Anime";
import {AnimeList} from "@/components/AnimeList";
import styles from  "./main.module.scss"
import ComingAnimes from "@/components/ComingAnimes";
import SingleComingAnimeCard from "@/components/ComingAnimes/SingleComingAnimeCard";

export default async function Home()    {

    const all_anime = await AnimeService.getAllAnime()

    const popular = await AnimeService.getCatalog('popular')
    const ongoing= await AnimeService.getCatalog('ongoing')

    console.log(popular)

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
        description: 'Історія переносить глядачів на 12 років назад, у 2006, коли найсильніший маг Ґоджьо Сатору був звичайнісіньким учнем старшої школи. Разом зі своїм другом, Ґето Суґуру, вони вирушають на місію, від якої залежить доля всього світу. Перші виклики і перешкоди, перші помилки й втрати. Із цієї подорожі вони повернуться зовсім іншими людьми.',
        link: '#',
        image_banner:'/assets/img/banner/mushoku_banner.avif',
        image: '/assets/img/banner/rudeus_silfi.png'

    }

    const banners = [bannerData, bannerData2, bannerData3]
  return (
    <>
        <MainBanner/>
        <div className={styles.main_anime_section}>
            <AnimeList animeList={ongoing} title={'Ongoings'} link={'/catalog/categories/ongoing'} />
            <AnimeList animeList={popular} title={'Popular'}  link={'/catalog/categories/popular'}/>
            <SingleComingAnimeCard data={banners[2]}/>
            <AnimeList animeList={all_anime} title={'All anime'} link={'/categoriesries'}/>
        </div>

    </>
  )
}
