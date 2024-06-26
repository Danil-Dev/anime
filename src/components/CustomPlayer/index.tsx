'use client';

import { useEffect, useRef, useState } from "react";
import { ShakaPlayer } from "@/lib/dshaka-player/components/ShakaPlayer";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AnimeHistory, UserServices } from "@/services/User";
import { useSession } from "next-auth/react";
import {
    Container,
    Flex,
    Box,
    Link,
    Heading,
    Text,
    Button,
    VStack,
    AbsoluteCenter,
    Spinner,
    IconButton
} from "@chakra-ui/react";
import { EpisodeItem } from "../EpisodesList/EpisodeItem";
import {IEpisode} from "@/services/Anime";
import * as process from "process";
import BlockPlayer from "@/components/BlockPlayer";
import {Flag} from "react-feather";
import {ReportModal} from "@/components/ReportModal";

interface CustomPlayerProps {
    episodeData:{
        id: string,
        currentEpisode: IEpisode,
        prevEpisode: null | {
            episode_number: number,
            title: string,
            image_thumb: string,
        },
        nextEpisode: null | {
            episode_number: number,
            title: string,
            image_thumb: string,
        }
    }
}

export function CustomPlayer({ episodeData }: CustomPlayerProps) {

    const [geo, setGeo] = useState<{country: string} | undefined>(undefined)
    const params = useParams();
    const session = useSession();
    const router = useRouter();
    const timerRef = useRef(null);
    const currentEpisode = Number(params.episode);
    const [loading, setLoading] = useState<boolean>(true);
    const [episodeSaved, setEpisodeSaved] = useState<AnimeHistory | null>(null);

    const handleOnmountPlayer = (currentTime: number) => {
        if (currentTime > 0 && session.data?.user) {
            UserServices.updateUserWatchedHistory(episodeData.id, session.data.user.id, currentTime, episodeData.currentEpisode._id, currentEpisode).then((res) => {
                console.log('updateUserWatchedHistory', res);
            });
        }
    };
    const onEnd = () => {
        router.push(`/anime/${params.id}/${currentEpisode + 1}/watch`);
    };

    const onPlay = (video: HTMLVideoElement) => {
        timerRef.current = setInterval(() => {
            if (video) {
                localStorage.setItem(episodeData.id, JSON.stringify({
                    currentTime: video.currentTime,
                    currentEpisode,
                    date: Date.now()
                }));
            }
        }, 10000);
    };

    const onPause = (video: HTMLVideoElement) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        saveEpisodeDataToLocalStorage(video.currentTime);
    };

    const handleChangeEpisode = (number: number) => {
        setLoading(true);
        router.push(`/anime/${params.id}/${number}/watch`);
    };

    const onSeeked = (video: HTMLVideoElement) => {
        if (video) {
            saveEpisodeDataToLocalStorage(video.currentTime)
        }
    };

    const loadEpisodeDataFromLocalStorage = () => {
        const localData = localStorage.getItem(episodeData.id);
        return localData ? JSON.parse(localData) : null;
    };

    const saveEpisodeDataToLocalStorage = (currentTime: number) => {
        localStorage.setItem(episodeData.id, JSON.stringify({
            currentTime,
            currentEpisode,
            date: Date.now()
        }));
    };

    const loadEpisodeDataFromServer = async () => {
        if (session.data?.user) {

            const res = await UserServices.getUserEpisodeHistory(session.data.user.id, episodeData.currentEpisode._id);

            return res.success ? res.episode : null;
        }
        return null;
    };

    const isDataRecent = (date: number): boolean => {
        return date > Date.now() - 3 * 60 * 1000;
    };

    const updateEpisodeData = async () => {
        const localSave = loadEpisodeDataFromLocalStorage();

        if (localSave && localSave.currentEpisode === currentEpisode) {
            if (isDataRecent(localSave.date)) {
                setEpisodeSaved({
                    animeId: episodeData.id,
                    episodeNumber: localSave.currentEpisode,
                    currentTime: localSave.currentTime
                });
                setLoading(false);
            } else {
                const serverSave = await loadEpisodeDataFromServer();
                if (serverSave) {
                    const serverTime = new Date(serverSave.watchedOn).getTime();
                    if (serverTime > localSave.date) {
                        setEpisodeSaved(serverSave);
                        setLoading(false);
                    } else {
                        setEpisodeSaved({
                            animeId: episodeData.id,
                            episodeNumber: localSave.currentEpisode,
                            currentTime: localSave.currentTime
                        });
                        setLoading(false);
                    }
                } else {
                    setEpisodeSaved({
                        animeId: episodeData.id,
                        episodeNumber: localSave.currentEpisode,
                        currentTime: localSave.currentTime
                    });
                    setLoading(false);
                }
            }
        } else if (!localSave || localSave.currentEpisode !== currentEpisode) {
            const serverSave = await loadEpisodeDataFromServer();
            if (serverSave) {
                setEpisodeSaved(serverSave);
                setLoading(false);
            } else {
                setEpisodeSaved({
                    animeId: episodeData.id,
                    episodeNumber: currentEpisode,
                    currentTime: 0
                });
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        updateEpisodeData();
    }, [session]);

    useEffect (() => {
        fetch('/api/edge-geo').then(async (res) => {
            const geo = await res.json()


            setGeo({ country : geo.country || undefined})
        })
    }, []);

    console.log (geo, process.env.NODE_ENV)

    return (
      <>

          {loading || !episodeData || !geo  ? (
            <Box minH={'600px'} bg={'black'} w={'100%'} position={'relative'}>
                <AbsoluteCenter>
                    <Spinner size={'xl'} />
                </AbsoluteCenter>
            </Box>
          ) : (
            <Box mt={'75px'}>
                {(
                  process.env.NODE_ENV === 'development' || geo.country === 'UA' ||
                  (session.data?.user && session.data.user.status === 'admin')) ? (
                  <ShakaPlayer
                    url={episodeData.currentEpisode.video}
                    intro={episodeData.currentEpisode?.intro}
                    end={episodeData.currentEpisode.end}
                    onOnmountPlayer={handleOnmountPlayer}
                    onEnd={onEnd}
                    currentTime={episodeSaved?.currentTime || 0}
                    isLastEpisode={!episodeData.nextEpisode}
                    onPlay={onPlay}
                    onPause={onPause}
                    onSeeked={onSeeked}
                    poster={episodeData.currentEpisode.image_thumb}
                  />
                ) : <BlockPlayer/>}
                <Box bg={'background'}>
                    <Container maxW={'container.xl'}>
                        <Flex justifyContent={'flex-end'} gap={2} align={'center'} w={'100%'}>
                            <Text py={4} m={0} align={'right'}>Помітили помилку в плеєрі? Повідомте про це нам.</Text>
                            <ReportModal/>
                        </Flex>

                    </Container>
                </Box>

            </Box>

          )}
          <Container maxW={'container.xl'}>
              <Flex justifyContent={'space-between'} mt={'40px'} mb={'24px'}>
                  <Box width={{ base: '100%', md: '65%' }}>
                      <VStack spacing={5} align={'left'}>
                          <Link color={'textYellow'} as={NextLink} href={`/anime/${params.id}/`} fontSize={'18px'}>
                              {/*{anime.title}*/}
                          </Link>
                          <Heading>
                              E{episodeData.currentEpisode.episode_number} - {episodeData.currentEpisode.title}
                          </Heading>
                          <Text fontSize={'18px'}>{episodeData.currentEpisode.description}</Text>
                      </VStack>
                  </Box>
                  <Box display={{ base: 'none', md: 'block' }}>
                      <VStack spacing={5} align={'left'}>
                          {episodeData.nextEpisode && (
                            <Box>
                                <Heading size={'16px'}>Наступний епізод </Heading>
                                <EpisodeItem episode={episodeData.nextEpisode} handleChangeEpisode={handleChangeEpisode} />
                            </Box>
                          )}
                          {episodeData.prevEpisode && (
                            <Box>
                                <Heading size={'16px'}>Попередній епізод </Heading>
                                <EpisodeItem episode={episodeData.prevEpisode} handleChangeEpisode={handleChangeEpisode} />
                            </Box>
                          )}
                          <Button as={NextLink} href={`/anime/${params.id}/`}>Більше епізодів</Button>
                      </VStack>
                  </Box>
              </Flex>
              <Box display={{ base: 'block', md: 'none' }} mb={'15px'}>
                  <VStack spacing={5} align={'left'}>
                      {episodeData.nextEpisode && (
                        <Box>
                            <Heading size={'16px'}>Наступний епізод </Heading>
                            <EpisodeItem episode={episodeData.nextEpisode} handleChangeEpisode={handleChangeEpisode} />
                        </Box>
                      )}
                      { episodeData.prevEpisode && (
                        <Box>
                            <Heading size={'16px'}>Попередній епізод </Heading>
                            <EpisodeItem episode={episodeData.prevEpisode} handleChangeEpisode={handleChangeEpisode} />
                        </Box>
                      )}
                      <Button as={NextLink} href={`/anime/${params.id}/`}>Більше епізодів</Button>
                  </VStack>
              </Box>
          </Container>
      </>
    );
}