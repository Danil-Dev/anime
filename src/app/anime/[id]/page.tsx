
import {AnimeService, IAnimeData, UserData} from "@/services/Anime";
import Image from "next/image";
import {Tags} from "@/components/Tags";
import {Calendar, Star} from "react-feather";
import AddToWatchListButton from "@/components/Button/AddToWatchlist";
import {EpisodeCard} from "@/components/EpisodeCard";
import {Box, Container, Flex, Text, Heading, VStack, HStack, Spacer, Grid, GridItem} from "@chakra-ui/layout";

import AnimeInfo from "@/components/AnimeInfo";
import {authOptions} from "@/configs/auth";
import {getServerSession} from "next-auth/next";





export default async function SinglePage ({params: {id}} : {params: {id:string}}) {


    const session = await getServerSession(authOptions)

    console.log('single page', id)

    const anime = await AnimeService.getAnime(id, session?.user?.id)


    console.log('anime', anime)

    const pretty_date = new Date(anime.release_date).getFullYear()


    // const userData : UserData = await AnimeService.getAnimeWithCredentials( anime.id, session?.user?.id)
    // console.log(userData)






    return (
        <>
            <Box
                pt={'175px'}
                pb={'120px'}
                bgImage={`url("${anime.image_banner}")`}
                bgPosition={'top center'}
                bgSize={'cover'}
                zIndex={'-1'}
                position={'relative'}
                _before={{
                    content: "''",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "backgroundOutlineBlack",
                    zIndex: "-1",
                    backdropFilter: "blur(5px)"
                }}
            >
                <Container
                    maxW={'container.xl'}

                >
                    <Flex
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <Box w={'35%'} >
                            <Box
                                borderRadius={'10px'}
                                overflow={'hidden'}
                                display={'inline-block'}
                            >
                                <Image src={anime.image} alt={anime.title} width={300} height={430}/>
                            </Box>
                        </Box>
                        <VStack spacing={4}
                                align={'left'}
                                w={'65%'}
                        >
                            <Heading fontSize={'52px'}>{anime.title}</Heading>
                            <HStack spacing={2} alignItems={'center'}>
                                <Tags tags={anime.genre}/>
                                <Calendar size={16}/>
                                <Text mb={0}>{pretty_date}</Text>
                                <Star size={16}/>
                                <Text mb={0}>{anime.rating}</Text>
                            </HStack>
                            <Text>{anime.description}</Text>
                        </VStack>
                    </Flex>
                </Container>
            </Box>
            <Container
                maxW={'container.xl'}
                paddingTop={'50px'}
            >
                <Flex>
                    <Box w={'60%'}>
                        <Heading fontSize={'26px'}>{anime.title}</Heading>
                        <Box>
                            <AddToWatchListButton disable={ !anime.auth} isInWatchlist={anime.isInWatchlist} id={anime._id}/>
                        </Box>
                        <AnimeInfo anime={anime}/>
                    </Box>
                    <Spacer/>
                    <Box w={'30%'}>
                        <Heading fontSize={'24px'}>
                            Current episode
                        </Heading>
                        <EpisodeCard episode={anime.episodes[anime.lastWatchedEpisode | 0]} animeId={anime.id}/>
                    </Box>
                </Flex>
            </Container>
            <Container
                maxW={'container.xl'}
                pt={'50px'}
                pb={'50px'}
            >
                <Heading>Episodes</Heading>
                <Grid templateColumns={'repeat(4, 1fr)'} gap={6}>
                    {anime.episodes.map((episode , idx)=> (
                        <GridItem key={idx}>
                            <EpisodeCard episode={episode}  animeId={anime.id}/>
                        </GridItem>

                    ))}
                </Grid>
            </Container>
        </>
    )

}