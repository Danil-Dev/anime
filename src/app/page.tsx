import MainBanner from "@/components/MainBanner";
import {AnimeService, IBannerData} from "@/services/Anime";
import {AnimeList} from "@/components/AnimeList";
import styles from  "./main.module.scss"
import ComingAnimes from "@/components/ComingAnimes";
import SingleComingAnimeCard from "@/components/ComingAnimes/SingleComingAnimeCard";
import * as process from "process";

export default async function Home()    {



    const animeLists = await AnimeService.getAnimeLists(['popular', 'ongoing', 'action'])




    const bannerData : IBannerData = {
        title: 'Магічна битва (2 сезон)',
        genres: [
            {
                title: 'Бойовик',
                name: 'action'
            }, {
                title: 'Драма',
                name: 'drama'
            }, {
                title: 'Надприродне',
                name: 'supernatural'
            }
        ],
        studio: 'Cтудiя: MAPPA',
        description: 'ОПИСАНИЕ ОЧЕНЬ МНОГА ТЕКСТА ВОТ',
        link: '/',
        image_banner:'/assets/img/bgImages/comingAnimeMagicBattleSliderItem.jpg',
        image: '/assets/img/poster/mushoku.webp'
    }
    const bannerData2 : IBannerData = {
        title: 'Магічна битва (3 сезон)',
        genres: [
            {
                title: 'Бойовик',
                name: 'action'
            }, {
                title: 'Драма',
                name: 'drama'
            }, {
                title: 'Надприродне',
                name: 'supernatural'
            }
        ],
        studio: 'Cтудiя: MAPPA',
        description: 'ОПИСАНИЕ ОЧЕНЬ МНОГА ТЕКСТА ВОТ',
        link: '/',
        image_banner:'/assets/img/bgImages/comingAnimeMagicBattleSliderItem.jpg',
        image: '/assets/img/poster/mushoku.webp'
    }
    const bannerData3 : IBannerData = {
        title: 'Тільки я візьму новий рівень',
        genres: [
            {
                title: 'Пригоди',
                name: 'adventure'
            },
            {
                title: 'Фентезі',
                name: 'fantasy'
            },
            {
                title: 'Бойовик',
                name: 'action'
            },
        ],
        studio: 'A-1 Pictures',
        description: 'На Землі почали відкриватися портали з яких полізли монстри. Та разом з цим багато людей відкрили в собі магічні сили та почали використовувати їх для винищення цих монстрів й закриття порталів. Їх називають мисливцями. Сонг Джінху також отримав магічні сили, та вони в нього настільки малі, що він лиш трохи сильніший за звичайну людину. Навіть найслабші монстри – складні суперники для нього. На жаль, ніхто з мисливців не може збільшити свою силу. Виходить, Сонг так і буде найслабшим мисливцем? Можливо, так би й сталося, та на одному з завдань він разом з групою інших мисливців знаходять храм древнього бога...',
        link: '#',
        image_banner:'https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/af881117-c109-449d-124a-cfcc028ec400/public',
        image: 'https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/57584282-2b60-4cd4-ccb5-7025de0f7e00/public'

    }

    const banners = [bannerData, bannerData2, bannerData3]
  return (
    <>
        <MainBanner/>
        <div className={styles.main_anime_section}>
            <AnimeList animeList={animeLists['ongoing']} title={'Онґоїнґи'} link={'/catalog/categories/ongoing'} />
            <AnimeList animeList={animeLists['popular']} title={'Популярне'}  link={'/catalog/categories/popular'}/>
            <SingleComingAnimeCard data={banners[2]}/>
            <AnimeList animeList={animeLists['action']} title={'Бойовик'} link={'/catalog/genres/action'}/>
        </div>

    </>
  )
}
