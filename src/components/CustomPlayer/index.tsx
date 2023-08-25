'use client'
import {IAnimeData} from "@/services/Anime";
import {useEffect, useRef, useState} from "react";
import {ShakaPlayer} from "@/lib/dshaka-player/components/ShakaPlayer";
import NextLink from "next/link";
import {useParams, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {AnimeHistory, UserServices} from "@/services/User";
import {useSession} from "next-auth/react";
import {Container, Flex, Box, Link, Heading, Text, Button, VStack, AbsoluteCenter, Spinner} from "@chakra-ui/react";
import { Tags } from "../Tags";
import { EpisodeItem } from "../EpisodesList/EpisodeItem";


interface CustomPlayerProps{
    anime: IAnimeData,
}

export function CustomPlayer ({anime}: CustomPlayerProps) {

    const params = useParams()

    const session = useSession()
    const router = useRouter()
    const timerRef = useRef(null)


    const currentEpisode = Number(params.episode)
    const [loading, setLoading] = useState<boolean>(true)
    const [episodeSaved, setEpisodeSaved] = useState<AnimeHistory | null>(null)
    const isLastEpisode = !Boolean(anime.episodes[currentEpisode + 1])
    const episodeData = anime.episodes.find(episode => episode.episode_number === currentEpisode)

    const handleOnmountPlayer = (currentTime: number) => {
        console.log('OnmountPlayer', currentTime, episodeData, currentEpisode, anime._id)
        if (currentTime > 0 && session.data?.user) {

            console.log('handleOnmountPlayer', currentTime)
            UserServices.updateUserWatchedHistory(anime._id,session.data.user.id,  currentTime , episodeData._id, currentEpisode).then((res) => {

                console.log('updateUserWatchedHistory', res)
            })
        }

    }
    const onEnd = () => {
        // setCurrentEpisode(currentEpisode + 1)
        router.push(`/anime/${anime.id}/${currentEpisode + 1}/watch`)
    }
    const onPlay = (video: HTMLVideoElement) => {

        timerRef.current = setInterval(() => {
            if (video){
                console.log('saveData')
                localStorage.setItem(anime._id, JSON.stringify({
                    currentTime: video.currentTime,
                    currentEpisode,
                    date: Date.now()
                }))
            }
        }, 10000)
    }
    const onPause = (video: HTMLVideoElement) => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            saveEpisodeDataToLocalStorage(video.currentTime)
        }
    }
    const handleChangeEpisode = ( number : number) => {
        setLoading(true)
        router.push(`/anime/${anime.id}/${number}/watch`)
    }
    const onSeeked = (video: HTMLVideoElement) => {
        // if (video) {
        //     saveEpisodeDataToLocalStorage(video.currentTime)
        // }
    }

    const loadEpisodeDataFromLocalStorage = () => {
        const localData = localStorage.getItem(anime._id);
        return localData ? JSON.parse(localData) : null;
    }
    const saveEpisodeDataToLocalStorage = (currentTime: number) => {
        localStorage.setItem(anime._id, JSON.stringify({
            currentTime,
            currentEpisode,
            date: Date.now()
        }))
    }
    const loadEpisodeDataFromServer = async () => {
        if (session.data?.user) {

            console.log('loadEpisodeDataFromServer', session.data.user.id, episodeData)
            const res = await UserServices.getUserEpisodeHistory(session.data.user.id, episodeData._id)


            console.log('loadEpisodeDataFromServer', res)
            return res.success ? res.episode : null;
        }
        return null
    }
    const isDataRecent = (date: number): boolean => {
        return date > Date.now() - 3 * 60 * 1000;
    }

    const updateEpisodeData = async () => {


        const localSave = loadEpisodeDataFromLocalStorage();
        console.log('localSave', localSave)
        if (localSave && localSave.currentEpisode === currentEpisode) {
            if (isDataRecent(localSave.date)) {
                console.log('localSave', localSave)
                setEpisodeSaved({
                    animeId: anime._id,
                    episodeNumber: localSave.currentEpisode,
                    currentTime: localSave.currentTime
                })
                setLoading(false)
            } else {
                const serverSave = await loadEpisodeDataFromServer();
                if (serverSave){
                    const serverTime = new Date(serverSave.watchedOn).getTime()

                    if (serverTime > localSave.date) {
                        console.log('serverSave', serverSave)
                        setEpisodeSaved(serverSave)
                        setLoading(false)
                    }
                    else{
                        console.log('localSave', localSave)
                        setEpisodeSaved({
                            animeId: anime._id,
                            episodeNumber: localSave.currentEpisode,
                            currentTime: localSave.currentTime
                        })
                        setLoading(false)
                    }

                }
                else{
                    console.log('localSave', localSave)
                    setEpisodeSaved({
                        animeId: anime._id,
                        episodeNumber: localSave.currentEpisode,
                        currentTime: localSave.currentTime
                    })
                    setLoading(false)
                }
            }
        } else if(!localSave || localSave.currentEpisode !== currentEpisode){
            const serverSave = await loadEpisodeDataFromServer();
            if (serverSave){
                console.log('serverSave', serverSave)
                setEpisodeSaved(serverSave)
                setLoading(false)
            }
            else{
                setEpisodeSaved({
                    animeId: anime._id,
                    episodeNumber: currentEpisode,
                    currentTime: 0
                })
                setLoading(false)
            }
        }
    }



    useEffect(() => {
        updateEpisodeData()



    },[session])





    return (
        <>


            {loading || !episodeData ?(
                <Box minH={'600px'} bg={'black'} w={'100%'} position={'relative'}>
                    <AbsoluteCenter>
                        <Spinner size={'xl'}/>
                    </AbsoluteCenter>
                </Box>
             ) : (
                <ShakaPlayer
                    url={episodeData.video}
                    start={episodeData.start}
                    end={episodeData.end}
                    onOnmountPlayer={handleOnmountPlayer}
                    onEnd={onEnd}
                    currentTime={episodeSaved?.currentTime || 0}
                    isLastEpisode={isLastEpisode}
                    onPlay={onPlay}
                    onPause={onPause}
                    onSeeked={onSeeked}
                />
            )}
            <Container maxW={'container.xl'}>
                <Flex
                    justifyContent={'space-between'}
                    mt={'40px'}
                    mb={'24px'}
                >
                 <Box width={{base: '100%' ,md:'65%'}}>
                     <VStack
                         spacing={5}
                         align={'left'}>
                         <Link
                             color={'textYellow'}
                             as={NextLink}
                             href={`/anime/${anime.id}/`}
                             fontSize={'18px'}
                         >
                             {anime.title}

                         </Link>
                         <Heading>
                             E{episodeData.episode_number} - {episodeData.title}
                         </Heading>
                         <Text fontSize={'18px'}>{episodeData.description}</Text>
                     </VStack>
                 </Box>
                    <Box display={{base:'none', md:'block'}} >
                        <VStack spacing={5} align={'left'}>
                            {!isLastEpisode && (
                                <Box>
                                    <Heading size={'16px'}>Next Episode </Heading>
                                    <EpisodeItem episode={anime.episodes[currentEpisode + 1]} handleChangeEpisode={handleChangeEpisode}/>
                                </Box>)}
                            {currentEpisode !== 0 && (
                                <Box>
                                    <Heading size={'16px'}>Prev Episode </Heading>
                                    <EpisodeItem episode={anime.episodes[currentEpisode - 1]} handleChangeEpisode={handleChangeEpisode}/>
                                </Box>)}
                            <Button as={NextLink} href={`/anime/${anime.id}/`}>More Episodes</Button>
                        </VStack>
                    </Box>
                </Flex>
                <Box
                    display={{base:'inline-block', md:'none'}}
                     mb={'15px'}
                >
                    <VStack spacing={5} align={'left'}>
                        {!isLastEpisode && (
                            <Box>
                                <Heading size={'16px'}>Next Episode </Heading>
                                <EpisodeItem episode={anime.episodes[currentEpisode + 1]} handleChangeEpisode={handleChangeEpisode}/>
                            </Box>)}
                        {currentEpisode !== 0 && (
                            <Box>
                                <Heading size={'16px'}>Prev Episode </Heading>
                                <EpisodeItem episode={anime.episodes[currentEpisode - 1]} handleChangeEpisode={handleChangeEpisode}/>
                            </Box>)}
                        <Button as={NextLink} href={`/anime/${anime.id}/`}>More Episodes</Button>
                    </VStack>
                </Box>
            </Container>
        </>

    )
}


