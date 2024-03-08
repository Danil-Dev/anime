'use client'
import {IEpisode} from "@/services/Anime";
import styles from './episodeCard.module.scss'
import Image from "next/image";
import {Play} from "react-feather";
import {Heading, Link, Text} from "@chakra-ui/react";
import {Box, VStack} from "@chakra-ui/layout";
import NextLink from "next/link";
interface EpisodeCardProps {
    episode: IEpisode,
    animeId: string
}
export function EpisodeCard ({episode, animeId}: EpisodeCardProps) {


    if (!episode) return (
        <>
            <Heading>No episode Data</Heading>
        </>
    )


    return(
            <VStack spacing={4} alignItems={'left'}>
                <Link as={NextLink} href={`/anime/${animeId}/${episode.episode_number}/watch`}>
                    <Box
                        position={'relative'}
                        cursor={'pointer'}
                        overflow={'hidden'}
                        borderRadius={'10px'}
                        sx={{
                            '& > img': {
                                width: '100%',
                            }
                        }}
                    >
                        <Image
                            src={episode.image_thumb}
                            alt={episode.title}
                            width={320}
                            height={180}/>
                        <Box
                            position={'absolute'}
                            top={'50%'}
                            left={'50%'}
                            transform={'translate(-50%, -50%)'}
                            bg={'rgba(0,0,0,0.7)'}
                            borderRadius={'50%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            w={'50px'}
                            h={'50px'}
                            sx={{
                                '& > svg': {
                                    position: 'relative',
                                    left: '2px'
                                }
                            }}

                        >
                            <Play size={24}/>
                        </Box>
                    </Box>
                </Link>
                <Link as={NextLink} href={`/anime/${animeId}/watch`}>
                    <Text>E{episode.episode_number} - {episode.title}</Text>
                </Link>
            </VStack>
    )
}