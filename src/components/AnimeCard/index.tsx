'use client'
import {IAnimeData, IAnimeList, IAnimeSingle} from "@/services/Anime";

import Link from "next/link";
import Image from "next/image";
import {FC} from "react";
import styles from './animeCard.module.scss'
import {Box} from "@chakra-ui/layout";
import {Heading, LinkBox, LinkOverlay, Text} from "@chakra-ui/react";

interface AnimeCardProps{
    anime: IAnimeData,
    width?: number
}

export const AnimeCard: FC<AnimeCardProps> = ({anime, width = 300}) => {


    // @ts-ignore
    // @ts-ignore
    return (
        <LinkBox as={'div'} >
            <Box mb={5} >
                <LinkOverlay href={`/anime/${anime.id}/`}>
                    <Box rounded={'md'}
                         overflow={'hidden'}
                         // display={'inline-block'}
                         sx={{
                             '& > img': {
                                 width: '100%',
                             }
                         }}
                    >
                        <Image  src={anime.image} alt={anime.title}  width={width} height={width / 3 * 4}/>
                    </Box>
                </LinkOverlay>
            </Box>
            <Box borderRadius={'md'}>
                <Heading>
                    <LinkOverlay href={`/anime/${anime.id}/`}>
                        <Text noOfLines={1} fontSize={{base: 'sm', md: 'lg'}}>{anime.title}</Text>
                    </LinkOverlay>
                </Heading>
            </Box>
        </LinkBox>
    )
}