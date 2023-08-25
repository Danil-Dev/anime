'use client'
import {Button} from "@chakra-ui/react";
import {Bookmark, Play, TrendingDown, User} from "react-feather";
import {Pagination} from "@mantine/core";
import NextLink from "next/link";
import {IEpisodeData} from "@/services/Anime";

interface EpisodeCardProps {
    episode: IEpisodeData,
    animeId: string
}
export default function ContinueWatchingButton({episode, animeId}: EpisodeCardProps){

    return(
        <Button
            as={NextLink}
            href={`/anime/${animeId}/${episode.episode_number}/watch`}
            size={'lg'}
            variant={'primary'}
            colorScheme={'primary'}
            leftIcon={<Play size={18}/>}
            marginY={'30px'}
        >
            Continue

        </Button>
    )
}