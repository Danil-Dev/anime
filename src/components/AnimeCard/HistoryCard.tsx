"use client";

import {Heading, Link, LinkBox, LinkOverlay, Text} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout";
import {AnimeHistory, AnimeHistory2, ExtendedAnimeHistory} from "@/services/User";
import Image from "next/image";
import {Play} from "react-feather";
import NextLink from "next/link";
import buildTimeString from "@/utils/buildTimeString";


export default function HistoryCard({historyItem}: {
    historyItem: AnimeHistory2
}) {

  console.log (historyItem)

    const date = new Date(historyItem.watchedEpisodes.watchedOn);
    const pretty_date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;



    console.log(historyItem);
    return (
        <Box maxW={300} as={"div"}>
            <Box mb={5}>
                {/*<LinkOverlay href={`/anime/${historyItem.animeId.id}/watch?ep=${historyItem.episodeNumber}`}>*/}
                    <Box
                        position={"relative"}
                        cursor={"pointer"}
                        rounded={"md"}
                        overflow={"hidden"}
                        display={"inline-block"}
                        sx={{
                            '&:hover':{
                                bg: 'backgroundScrim'

                            },
                            "&:hover .play-button": {
                                visibility: "visible",
                                opacity: 1
                            }
                        }}
                    >
                        <LinkOverlay href={`/anime/${historyItem.animeDetails.id}/${historyItem.episodeDetails.episode_number}/watch`}>
                            <Image src={historyItem.episodeDetails.image_thumb} alt={historyItem.animeDetails.title} width={300}
                                   height={300}/>
                            <Box
                                position={"absolute"}
                                bottom={"0"}
                                right={"0"}
                                bg={"backgroundScrim"}
                                borderRadius={"5px"}
                                h={""}
                                p={"6px 8px"}
                            >
                                <Text mb={0}>

                                        <Text mb={0} fontSize={"sm"}> Зупинились на {buildTimeString(historyItem.watchedEpisodes.currentTime)} </Text>

                                </Text>
                            </Box>
                            <Box
                                position={"absolute"}
                                top={"50%"}
                                left={"50%"}
                                transform={"translate(-50%, -50%)"}
                                bg={"rgba(0,0,0,0.7)"}
                                borderRadius={"50%"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                className={"play-button"}
                                visibility={"hidden"}
                                opacity={0}
                                transition={"all 0.32s ease-in-out"}
                                w={"50px"}
                                h={"50px"}
                                sx={{
                                    "& > svg": {
                                        position: "relative",
                                        left: "2px"
                                    }
                                }}
                            >
                                <Play size={24}/>
                            </Box>
                        </LinkOverlay>


                    </Box>
                {/*</LinkOverlay>*/}
            </Box>
            <Box mt={"-10px"}>
                <Text noOfLines={[1]} fontSize={"sm"} color={"textSecondary"}>
                    {historyItem.animeDetails.title}
                </Text>
                <Heading mb={0}>

                        <Text mb={"2px"} fontSize={"md"}>
                            <Link as={NextLink} href={`/anime/${historyItem.animeDetails.id}/watch?ep=${historyItem.episodeDetails.episode_number}`}>
                                E{historyItem.episodeDetails.episode_number} - {historyItem.episodeDetails.title}
                            </Link>

                        </Text>
                </Heading>
                <Text fontSize={"sm"} color={"textSecondary"}>
                    {pretty_date}
                </Text>
            </Box>
        </Box>
    );
}