'use client'
import {IAnimeData, IAnimeList, IAnimeSingle} from "@/services/Anime";


import Image from "next/image";
import {FC} from "react";
import styles from './animeCard.module.scss'
import {Box} from "@chakra-ui/layout";
import {Heading, LinkBox, LinkOverlay, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {Link} from "@chakra-ui/layout";
interface AnimeCardProps{
    anime: IAnimeData,
    width?: number
}

export const AnimeCard: FC<AnimeCardProps> = ({anime, width = 300}) => {


    // @ts-ignore
    // @ts-ignore
    return (
        <Box  >
            <Box mb={5} >
                <Link as={NextLink} href={`/anime/${anime.id}/`}>
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
                </Link>
            </Box>
            <Box borderRadius={'md'}>
                <Heading>
                    <Link as={NextLink} href={`/anime/${anime.id}/`}>
                        <Text noOfLines={1} fontSize={{base: 'sm', md: 'lg'}}>{anime.title}</Text>
                    </Link>
                </Heading>
            </Box>
        </Box>
    )
}