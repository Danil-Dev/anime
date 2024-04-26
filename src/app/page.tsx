import MainBanner from "@/components/MainBanner";
import {AnimeService, IBannerData} from "@/services/Anime";
import {AnimeList} from "@/components/AnimeList";
import styles from  "./main.module.scss"
import ComingAnimes from "@/components/ComingAnimes";
import SingleComingAnimeCard from "@/components/ComingAnimes/SingleComingAnimeCard";
import * as process from "process";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/auth";
import {UserServices} from "@/services/User";
import HistoryCard from "@/components/AnimeCard/HistoryCard";
import HistoryListLanding from "@/components/HistoryList/HistoryListLanding";

export default async function Home()    {

    const session = await getServerSession(authOptions)

    console.log ("Session", session)

    const animeLists = await AnimeService.getAnimeLists(['popular', 'ongoing', 'action', 'complete'])

    const history =  await UserServices.getLastWatchedEpisodes(session ? session.user.id : null)

    console.log ('History', history)


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
        title: 'Реінкарнація безробітного: В інший світ на повному серйозі (2 сезон 2 частина)',
        genres: [
            {
                title: 'Пригоди',
                name: 'adventure'
            },
            {
                title: 'Комедія',
                name: 'comedy'
            },
            {
                title: 'Фентезі',
                name: 'fantasy'
            },
            {
                title: 'Еччі',
                name: 'ecci'
            },
        ],
        studio: 'Studio Bind',
        description: 'Історія Рудеуса продовжується. Після телепортації всі його друзі та знайомі потрапили в різні частини світу, і він досі не знайшов їх усіх, а шляхи з товаришами, з якими він мандрував понад рік, розійшлися. Проте найскладніше – ще попереду. І Рудеуса, і його родичів та близьких йому людей чекають дедалі більші виклики.',
        link: '/anime/mushoku_tensei_isekai_ittara_honki_dasu_2_2',
        image_banner:'https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/40f3df46-6a9a-40f2-cf6f-46ea30120f00/public',
        image: 'https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/bef6f676-75cd-4381-ef5e-0e6d1c01c600/public'

    }

    const banners = [bannerData, bannerData2, bannerData3]
  return (
    <>
        <MainBanner/>
        <div className={styles.main_anime_section}>
            <AnimeList animeList={animeLists['ongoing']} title={'Онґоїнґи'} link={'/catalog/categories/ongoing'} />
            {/*{*/}
            {/*    history && history.map((historyItem, index) => (*/}
            {/*      <HistoryCard key={index} historyItem={historyItem}/>*/}
            {/*  ))*/}

            {/*}*/}
            {
                history && <HistoryListLanding historyList={history}/>
            }

            <AnimeList animeList={animeLists['popular']} title={'Популярне'}  link={'/catalog/categories/popular'}/>
            <SingleComingAnimeCard data={banners[2]}/>

            <AnimeList animeList={animeLists['complete']} title={'Завершенні'}  link={'/catalog/categories/complete'}/>
            <AnimeList animeList={animeLists['action']} title={'Бойовик'} link={'/catalog/genres/action'}/>
        </div>

    </>
  )
}
