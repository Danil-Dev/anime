"use client";

import {Heading, Link, LinkBox, LinkOverlay, Text} from "@chakra-ui/react";
import {Box} from "@chakra-ui/layout";
import {AnimeHistory, ExtendedAnimeHistory} from "@/services/User";
import Image from "next/image";
import {Play} from "react-feather";
import NextLink from "next/link";
import buildTimeString from "@/utils/buildTimeString";


export default function HistoryCard({historyItem}: {
    historyItem: ExtendedAnimeHistory
}) {

    const date = new Date(historyItem.watchedOn);
    const pretty_date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;


    const time = (historyItem.episodeId.duration / 60) - (historyItem.currentTime / 60);

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
                        <LinkOverlay href={`/anime/${historyItem.animeId.id}/${historyItem.episodeNumber}/watch`}>
                            <Image src={historyItem.episodeId.image_thumb} alt={historyItem.animeId.title} width={300}
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
                                    {historyItem.currentTime + 30 > historyItem.episodeId.duration ? "Finished" : (
                                        <Text mb={0} fontSize={"sm"}> Зупинились на {buildTimeString(historyItem.currentTime)} </Text>
                                    )}
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
                    {historyItem.animeId.title}
                </Text>
                <Heading mb={0}>

                        <Text mb={"2px"} fontSize={"md"}>
                            <Link as={NextLink} href={`/anime/${historyItem.animeId.id}/watch?ep=${historyItem.episodeNumber}`}>
                                E{historyItem.episodeNumber} - {historyItem.episodeId.title}
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